import Joi from 'joi';
import User from '../../models/user';

export const register = async ctx => {
  // Request Body 검증하기
  const schema = Joi.object().keys({
    username: Joi.string()
      .alphanum()
      .min(3)
      .max(20)
      .required(),
    password: Joi.string().required(),
  });
  //1. 아이디 값이 문자열인가, 20자 미만인가, 비번은 문자열인가 등을 판단
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400;
    ctx.body = result.error; //result.error는 Joi에서 객체값으로 자세한정보를 담아 반환
    return;
  }

  const { username, password } = ctx.request.body;
  try {
  //2. username이 이미 존재하는지 확인
    const exists = await User.findByUsername(username);
    if (exists) {
      ctx.status = 409; // Conflictrs
      return;
    }

    const user = new User({
      username,
    });
    await user.setPassword(password); // 비밀번호 설정 (post로 전달받은 password를 bycrypt로 암호화)
    await user.save(); // 데이터베이스에 저장

    ctx.body = user.serialize();
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};



export const login = async ctx => {
  const { username, password } = ctx.request.body;
  console.log(username, password)
  console.log(ctx)
  // username, password 가 없으면 에러 처리
  if (!username || !password) {
    ctx.status = 401; // Unauthorized
    return;
  }
  try {
    const user = await User.findByUsername(username);
    // 계정이 존재하지 않으면 에러 처리
    console.log('씨티엑스 스테터스', ctx.status)
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 로그인시에는 입력된 번호와 bycrypt로 hash된 암호를 비교하여 검증
    if (!valid) {
      ctx.status = 401;
      return;
    }

    ctx.body = user.serialize();

    //아래는 토큰을 생성하여 클라이언트의 쿠키에 넣어주는 부분
    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};



export const check = async ctx => {
  // console.log('씨티엑스스테이트' , ctx.state)
  // console.log('씨티엑스' , ctx)

  const { user } = ctx.state;
  console.log(user)
  if (!user) {
    // 로그인중 아님
    ctx.status = 401; // Unauthorized
    return;
  }
  ctx.body = user;
};

export const logout = async ctx => {
  ctx.cookies.set('access_token');
  ctx.status = 204; // No Content
};
