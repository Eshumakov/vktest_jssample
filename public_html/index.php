<?php

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <!-- Кодировка веб-страницы -->
    <meta charset="utf-8">
    <!-- Настройка viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <!-- Подключаем jQuery -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
    <script src="/js/cookie.js"></script>
    <!-- Подключаем Bootstrap CSS -->
    <link rel="stylesheet" href="bootstrap-3.4.0-dist/css/bootstrap.min.css" >
    <link rel="stylesheet" href="/css/main.css" >
</head>
<body>

    <!-- Контент страницы -->
    <script>
        $(document).ready(function () {
            app.feed.getMy(10, 0);
            app.feed.create.show();
        });
    </script>
    <div id="messages-box" class="container alert alert-danger" style="display: none">

    </div>
    <div id="create-box" style="display:none;">
        <div class="container">
            <div class="row">
                <form role="form" id="create-form" class="contact-form">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <input type="text" class="form-control" name="title" autocomplete="off" id="title" placeholder="Title">
                                <input type="hidden" class="form-control" name="editId" autocomplete="off" id="editId" placeholder="Title">
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <div class="form-group">
                                <textarea class="form-control textarea" rows="4" name="message" id="message" placeholder="Message"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-12">
                            <button type="submit" class="btn main-btn pull-right btn-post">Post a message</button>
                            <button style="display: none" type="submit" class="btn main-btn pull-right btn-edit">Edit a message</button>
                            <a style="display: none" class="btn-new" onclick="app.feed.edit.show()">new post</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div id="articles-box" class="container" style="display: none">
        <div class="row">
            <h4 style="cursor: pointer; display: inline-block" onclick="app.feed.getFeed(10, 0)">Мой фид</h4> |
            <h4 style="cursor: pointer; display: inline-block" onclick="app.feed.getAll(10, 0)">Все публикации</h4> |
            <h4 style="cursor: pointer; display: inline-block" onclick="app.feed.getMy(10, 0)">Мои публикации</h4>
        </div>
        <div class="row article" style="display:none;">
            <div class="span8">
                <div class="row">
                    <div class="span8">
                        <h4><strong class="title">Title of the post</strong></h4>
                    </div>
                </div>
                <div class="row">
                    <div class="span6 article-content">
                        <p>
                            Lorem ipsum dolor sit amet, id nec conceptam conclusionemque. Et eam tation option. Utinam salutatus ex eum. Ne mea dicit tibique facilisi, ea mei omittam explicari conclusionemque, ad nobis propriae quaerendum sea.
                        </p>
                    </div>
                </div>
                <div class="row">
                    <div class="span8">
                        <p></p>
                        <p>
                            <i class="icon-user"></i> by <a onclick="app.feed.getUserFeed($(this).data('uid'))" style="cursor: pointer" data-uid="" class="author">John</a>
                            | <i class="icon-calendar"></i> <span  class="create-date">Sept 16th, 2012</span> |
                            <a onclick="" class="follow">Follow</a>
                            <a onclick="app.feed.update.set($(this).data('uid'), $(this).data('title'), $(this).data('message'))" style="cursor: pointer; display: none" data-uid="" class="edit">edit</a>
                        </p>
                    </div>
                </div>
                <hr>
            </div>
        </div>
    </div>
    <div id="login-box" class="container" style="display: none">
            <div class="row">
                <div class="col-md-5 mx-auto">
                    <div id="first">
                        <div class="myform form ">
                            <div class="logo mb-3">
                                <div class="col-md-12 text-center">
                                    <h1>Login</h1>
                                </div>
                            </div>
                            <form action="" method="post" name="login" novalidate="novalidate">
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email address</label>
                                    <input type="email" name="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email">
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Password</label>
                                    <input type="password" name="password" id="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter Password">
                                </div>
                                
                                <div class="col-md-12 text-center ">
                                    <button type="submit" class=" btn btn-block mybtn btn-primary tx-tfm">Login</button>
                                    <p></p>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            </div>
    </div>
    <div id="alert-box" style="display: none">
        <div class="alert-message alert-message-danger">
            <h4>
                Unknown Error</h4>
            <p class="content-error">
            </p>
        </div>
    </div>

    <!-- Подключаем Bootstrap JS -->
    <script src="bootstrap-3.4.0-dist/js/bootstrap.min.js"></script>
    <script src="/js/main.js?v=' . <?=time()?> . '"></script>

    <script src="https://cdn.jsdelivr.net/jquery.validation/1.15.1/jquery.validate.min.js"></script>
    <script src="/js/templates/login.js?v=' . <?=time()?> . '"></script>
    <script src="/js/templates/blog.js?v=' . <?=time()?> . '"></script>
</body>
</html>