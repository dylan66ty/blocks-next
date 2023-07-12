<template>
  <div class="not-found-wrapper">
    <p class="code">404</p>
    <h1 class="title">PAGE NOT FOUND</h1>
    <div>
      <a class="link" href="/">Take me home</a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .not-found-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .code {
      line-height: 64px;
      font-size: 64px;
      font-weight: 600;
    }

    .title {
      padding-top: 12px;
      letter-spacing: 2px;
      line-height: 20px;
      font-size: 20px;
      font-weight: 700;
    }

    .link {
      display: inline-block;
      border: 1px solid var(--brand-color);
      border-radius: 16px;
      padding: 3px 16px;
      font-size: 14px;
      font-weight: 500;
      color: var(--brand-color);
      transition: border-color 0.25s, color 0.25s;
    }
  }
</style>
