<header class="top" role="header">
  <div class="container bg-dark">
    <nav class="navbar navbar-expand-lg navbar-dark">
      <a class="navbar-brand" href="/">朱高攀的技术博客</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
          <li class="nav-item {% if page.navbar_active == 'pages' %}active{% endif %}">
            <a class="nav-link" href="/pages.html">
              <i class="fas fa-list"></i> 全部文章
            </a>
          </li>
          <!--<li class="nav-item {% if page.navbar_active == 'about' %}active{% endif %}">
            <a class="nav-link" href="/about.html">
              <i class="fas fa-info"></i> 关于
            </a>
          </li>-->
        </ul>
        <form class="form-inline my-2 my-lg-0" role="search" method="get" target="_blank" action="https://www.google.com/search">
          <input type="text" class="form-control" placeholder="Google 搜索" name="q" maxlength="200"/>
          <input type="hidden" name="oe" value="GB2312" />
          <input type="hidden" name="hl" value="zh-CN" />
          <input type="hidden" name="as_sitesearch" value="winwink.github.io" />
        </form>
      </div>
    </nav>
  </div>
</header>
