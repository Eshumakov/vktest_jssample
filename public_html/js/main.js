var app = app || {};
(function() {
    $.extend(app, {
        baseUrl: 'http://82.202.236.23:8080',
        init: function () {
            app.feed.show();
        },
        follow: {
            add: function (author_id) {
                app.request.send('/follow/', 'POST', {author_id: author_id}, function (data) {
                    if (data.error) {
                        if ((typeof app.errors[data.error]) != 'undefined') {
                            app.errors[data.error]();
                        } else {
                            app.errors.other();
                        }
                    } else {
                        app.feed.getFeed(10, 0);
                    }
                })
            },
            delete: function (author_id) {
                app.request.send('/follow/', 'DELETE', {author_id: author_id}, function (data) {
                    if (data.error) {
                        if ((typeof app.errors[data.error]) != 'undefined') {
                            app.errors[data.error]();
                        } else {
                            app.errors.other();
                        }
                    } else {
                        app.feed.getFeed(10, 0);
                    }
                })
            }
        },
        feed: {
            getFeed: function (limit, offset) {
                app.request.send('/feed/', 'get', {limit: limit, offset: offset}, function (data) {
                    if (data.error) {
                        if ((typeof app.errors[data.error]) != 'undefined') {
                            app.errors[data.error]();
                        } else {
                            app.errors.other();
                        }
                    } else {
                        app.feed.clear();
                        app.feed.renderArticles(data);
                    }
                })
            },
            getMy: function (limit, offset) {
                app.request.send('/feed/getMy', 'get', {limit: limit, offset: offset}, function (data) {
                    if (data.error) {
                        if ((typeof app.errors[data.error]) != 'undefined') {
                            app.errors[data.error]();
                        } else {
                            app.errors.other();
                        }
                    } else {
                        app.feed.clear();
                        app.feed.renderArticles(data);
                    }
                });
            },
            getUserFeed: function (userId, limit, offset) {
                app.request.send('/feed/getUser', 'get', {userId: userId, limit: limit, offset: offset}, function (data) {
                    if (data.error) {
                        if ((typeof app.errors[data.error]) != 'undefined') {
                            app.errors[data.error]();
                        } else {
                            app.errors.other();
                        }
                    } else {
                        app.feed.clear();
                        app.feed.renderArticles(data);
                    }
                });
            },
            getAll: function (limit, offset) {
                app.request.send('/feed/getAll', 'get', {limit: limit, offset: offset}, function (data) {
                    if (data.error) {
                        if ((typeof app.errors[data.error]) != 'undefined') {
                            app.errors[data.error]();
                        } else {
                            app.errors.other();
                        }
                    } else {
                        app.feed.clear();
                        app.feed.renderArticles(data);
                    }
                });
            },
            clear: function () {
                for (var i = 0; i < $('#articles-box .article').length; i) {
                    var el = $('#articles-box .article')[i];
                    if ($(el).css('display') != 'none' || !$(el).css('display')) {
                        $(el).remove();
                    } else {
                        i++;
                    }
                }
            },
            renderArticles: function (data) {
                $('#articles-box').show();
                var template = $('#articles-box .article');
                for (var i in data.articles) {
                    template = template.clone();
                    var id = data.articles[i].id;
                    var txt = data.articles[i].article_text;
                    var txtOrigin = data.articles[i].origin_text;
                    var title = data.articles[i].title;
                    var insert_date = data.articles[i].insert_date;
                    var update_date = data.articles[i].update_date;
                    var can_edit = data.articles[i].can_edit;
                    var can_follow = data.articles[i].can_follow;
                    var is_me = data.articles[i].is_me;
                    var author_name = data.articles[i].author_name;
                    var author_id = data.articles[i].author_id;

                    template.css('display', 'block');
                    template.find('.title').html(title);
                    template.find('.article-content').html(txt);
                    template.find('.create-date').html(insert_date);
                    template.find('.author').html(author_name);
                    template.find('.author').attr('data-uid', author_id);
                    template.find('.edit').attr('data-uid', id);
                    template.find('.edit').attr('data-title', title);
                    template.find('.edit').attr('data-message', txtOrigin);

                    if (can_follow) {
                        template.find('.follow').css('display', 'inline-block');
                        template.find('.follow').text('Follow');
                        template.find('.follow').attr('onclick', 'app.follow.add(' + author_id + ')');
                    } else {
                        template.find('.follow').css('display', 'inline-block');
                        template.find('.follow').text('Unfollow');
                        template.find('.follow').attr('onclick', 'app.follow.delete(' + author_id + ')');
                    }

                    if (is_me) {
                        template.find('.follow').css('display', 'none');
                    }

                    
                    if (can_edit) {
                        template.find('.edit').css('display', 'inline-block');
                    }

                    $('#articles-box').append(template);
                }
            },
            create: {
                show: function () {
                    $('#create-box').show();
                },
                request: function (title, message) {
                    app.request.send('/feed/article', 'POST', {title: title, message: message}, function (data) {
                        if (data.error) {
                            if ((typeof app.errors[data.error]) != 'undefined') {
                                app.errors[data.error]();
                            } else {
                                app.errors.other(data);
                            }
                        } else {
                            app.feed.getMy(10, 0);
                        }
                    });
                }
            },
            edit: {
                show: function () {
                    $('#create-box').show();
                    $('#create-box .btn-post').show();
                    $('#create-box .btn-edit').hide();
                    $('#create-box .btn-new').hide();

                    $('#title').val('');
                    $('#message').val('');
                    $('#editId').val('');
                },
                request: function (id, title, message) {
                    app.request.send('/feed/article', 'PUT', {id: id, title: title, message: message}, function (data) {
                        if (data.error) {
                            if ((typeof app.errors[data.error]) != 'undefined') {
                                app.errors[data.error]();
                            } else {
                                app.errors.other(data);
                            }
                        } else {
                            app.feed.getMy(10, 0);
                        }
                    });
                }
            },
            update: {
                set: function (id, title, message) {
                    $('#title').val(title);
                    $('#message').val(message);
                    $('#editId').val(id);

                    $('#create-form .btn-post').hide();
                    $('#create-form .btn-edit').show();
                    $('#create-form .btn-new').show();
                }
            },
        },
        errors: {
            need_auth: function() {
                app.user.login.show();
            },
            other: function (data) {
                if (data && data.params && data.params.message) {
                    app.request.message(data.params.message);
                } else {
                    app.request.message('unknown error');
                }

            }
        },
        user: {
            login: {
                show: function() {
                   $('#login-box').show();
                   $('#articles-box').hide();
                   $('#create-box').hide();
                },
                request: function (login, password) {
                    app.request.send('/user/login/', 'GET', {login: login, password: password}, function (data) {
                        if (data.error) {
                            app.request.message(data.params.msg);
                        } else {
                            $.cookie("uhash", data.hash, { expires : 2 });
                            $.cookie("uid", data.id, { expires : 2 });
                            $('#login-box').hide();
                            $('#articles-box').show();
                            $('#create-box').show();
                            app.feed.getMy(10, 0);
                        }
                    });
                }
            }
        },
        request: {
            send: function (url, method, params, callback) {
                url = app.baseUrl + url;
                $.ajax({
                    url: url,
                    type: method.toUpperCase(),
                    success: function(result) {
                        callback(result);
                    },
                    data: params,
                    dataType: 'json',
                    xhrFields: { withCredentials: true }
                });
            },
            message: function (message) {
                $('#messages-box').html(message);
                $('#messages-box').show(300);
                setTimeout(function () {
                    $('#messages-box').hide(300);
                }, 5000)
            }
        }
    });
})();

