import{o as n,d as s,f as a}from"./app.7dec0a3c.js";const e=a(`<h1 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-hidden="true">#</a></h1><h2 id="开发环境" tabindex="-1">开发环境 <a class="header-anchor" href="#开发环境" aria-hidden="true">#</a></h2><p>首先得有 node，并确保 node 版本是 <code>v16</code> 或以上。</p><div class="language-shell" language="shell"><pre><code><span class="token comment"># v16+</span>
<span class="token function">node</span> <span class="token parameter variable">--version</span>
</code></pre></div><h2 id="使用" tabindex="-1">使用 <a class="header-anchor" href="#使用" aria-hidden="true">#</a></h2><p><strong>安装blocks-next</strong></p><div class="language-shell" language="shell"><pre><code><span class="token function">pnpm</span> <span class="token function">install</span> blocks-next
</code></pre></div><p><strong>在vue3项目中注册block-next</strong></p><div class="language-ts" language="ts"><pre><code><span class="token comment">// main.ts</span>
<span class="token keyword">import</span> BlocksNext<span class="token punctuation">,</span> <span class="token punctuation">{</span>Icon<span class="token punctuation">}</span> from blocks<span class="token operator">-</span>next
<span class="token comment">// 引入BlocksNext样式</span>
<span class="token keyword">import</span> <span class="token string">&#39;blocks-next/theme-default/index.css&#39;</span>

<span class="token comment">// 注册BlocksNext组件库</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>BlocksNext<span class="token punctuation">)</span>
<span class="token comment">// 注册BlocksNext图标库</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>Icon<span class="token punctuation">)</span> 

</code></pre></div>`,9),t=[e],r=JSON.parse('{"title":"快速开始","description":"","frontmatter":{},"headers":[{"level":2,"title":"开发环境","slug":"开发环境","link":"#开发环境","children":[]},{"level":2,"title":"使用","slug":"使用","link":"#使用","children":[]}],"relativePath":"guide/getting-started.md","lastUpdated":1691726761000}'),o={name:"guide/getting-started.md"},d=Object.assign(o,{setup(c){return(p,l)=>(n(),s("div",null,t))}});export{r as __pageData,d as default};
