const checkLoggedIn = (ctx, next) => {
    if (!ctx.state.user) {
        console.log('유저없음')
      ctx.status = 401; // Unauthorized
      return;
    }
    return next();
  };
  
  export default checkLoggedIn;
  