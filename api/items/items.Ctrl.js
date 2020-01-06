import Post from '../../models/items'
import mongoose from 'mongoose';
// import Joi from 'joi';

const { ObjectId } = mongoose.Types;

export const checkObjectId = (ctx, next) => {
  const { id } = ctx.params;
  if (!ObjectId.isValid(id)) {
    ctx.status = 400; // Bad Request
    return;
  }
  return next();
};

export const write = async ctx => {
  const {title, body, tags} = ctx.request.body;
  const post = new Post({
    title,
    body,
    tags,
    user : ctx.state.user,
  });
  console.log(post.user)
  try {
    await post.save();
    //save는 mongoose의 메소드로서 데이터베이스에 내용을 저장하는 메소드
    ctx.body = post;
  } catch (e) {
    ctx.throw(500, e)
  }
}
