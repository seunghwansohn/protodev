import Post from '../../models/items'
import mongoose from 'mongoose';
import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

export const read = async ctx => {
  ctx.body = '바바바'
}
export const write = async ctx => {
  const schema = Joi.object().keys({
    // 객체가 다음 필드를 가지고 있음을 검증
    title: Joi.string().required(), // required() 가 있으면 필수 항목
    body: Joi.string().required(),
    tags: Joi.array()
      .items(Joi.string())
      .required(), // 문자열로 이루어진 배열
  });
  console.log('아이템추가 실행중')
  console.log(ctx)
    // 검증 후, 검증 실패시 에러처리
  const result = Joi.validate(ctx.request.body, schema);
  if (result.error) {
    ctx.status = 400; // Bad Request
    ctx.body = result.error;
    return;
  }
  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user : ctx.state.user,
  });

  console.log('포스트유저는', post.user)
  try {
    await post.save();
    //save는 mongoose의 메소드로서 데이터베이스에 내용을 저장하는 메소드
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e)
  }
}


