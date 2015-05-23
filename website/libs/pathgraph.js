(function (global) {
    'use strict';

    var internal = {
        init: function () {
            var gitgraph = new GitGraph({
                template: "metro",
                orientation: "vertical",
                mode: "compact"
            });
            var primaryColor = "#185F72";
            var master = gitgraph.branch("master", {
                color: primaryColor
            });
            master.commit({
                dotSize: 18,
                detailId: "stats-card",
                message: "Android: From Zero to Hero",
                image: "img/flag-checkered.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            }).commit( {
                dotSize: 18,
                detailId: "card-1",
                message: "Android Studio Set-Up",
                image: "img/coursera.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            }).commit({
                dotSize: 18,
                message: "Building your first Hello World App",
                detailId: "card-2",
                image: "img/vogella.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            }).commit({
                dotSize: 18,
                message: "Activity Lifecycle - Google IO",
                detailId: "card-3",
                image: "img/youtube-play.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            }).commit({
                dotSize: 18,
                message: "Rich and Responsive Layouts (Lesson 5)",
                detailId: "card-4",
                image: "img/udacity.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            });
            var design = gitgraph.branch("material-design");
            design.commit({
                dotSize: 18,
                message: "Introduction to Material Design",
                detailId: "card-5",
                messageDisplay: true,
                image: "img/youtube-play.png"
            }).commit({
                dotSize: 18,
                message: "Implementing Material Design in your App",
                detailId: "card-6",
                messageDisplay: true,
                image: "img/android.png"
            });
            design.merge(master,{
                dotSize: 18,
                message: "Android Testing",
                detailId: "card-7",
                image: "img/presentation.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            });
            master.commit( {
                dotSize: 18,
                message: "Android Debugging",
                detailId: "card-8",
                messageDisplay: true,
                image: "img/vogella.png",
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            });
            var game = gitgraph.branch("game-dev");
            game.commit({
                dotSize: 18,
                message: "Chapter 9 - Building the Game",
                detailId: "card-9",
                image: "img/file-pdf.png",
                messageDisplay: true
            });
            master.commit({
                dotSize: 18,
                message: "Note App 1",
                detailId: "card",
                image: "img/wiki.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            });
            game.commit({
                dotSize: 18,
                message: "Install and Use Android Play Game Services",
                detailId: "card-10",
                image: "img/presentation.png",
                messageDisplay: true
            });
            master.commit({
                dotSize: 18,
                message: "Note App 2",
                detailId: "card",
                image: "img/file-pdf.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            });
            game.merge(master, {
                dotSize: 18,
                message: "How to get rich with Crap - Release your App!",
                detailId: "card-11",
                image: "img/google-play.png",
                messageDisplay: true,
                dotColor: primaryColor,
                dotStrokeColor: primaryColor,
                color: primaryColor
            });

            global.gitgraph = gitgraph;

            internal.bindCanvasClick();
        },
        bindCanvasClick: function () {
            var graphCanvas = $("#gitGraph")[0];
            $("#gitGraph").on("click", function (event) {
                var x = event.originalEvent.pageX - graphCanvas.offsetParent.offsetLeft - graphCanvas.offsetLeft - global.gitgraph.marginX;
                var y = event.originalEvent.pageY - graphCanvas.offsetParent.offsetTop - graphCanvas.offsetTop - global.gitgraph.marginY;
                var i, commit;

                for(i = 0; i < global.gitgraph.commits.length; i++) {
                    commit = global.gitgraph.commits[i];
                    var top = commit.y - commit.dotSize;
                    var bottom = commit.y + commit.dotSize;
                    var left = commit.x - commit.dotSize;
                    var right = commit.x + commit.dotSize;
                    //console.log("x: " + x + " | y: " + y + " / top: " + top
                    //    + " | bottom: " + bottom + " | left: " + left + " | right: " + right);
                    if ((y > top && y < bottom) && (x > left && x < right )) {
                        console.log("clicked on commit: " + commit.message + " (" + commit.detailId + ")");
                        $("html, body").animate({ scrollTop: $("#" + commit.detailId).offset().top - 140 }, 1000);
                    }
                }
            });
        },
        highlightNodeByCard: function(card) {
            if($(card).hasClass("hidden")) {
                return;
            }

            var id = card.id;
            var shouldUpdate = false;
            var i, commit;
            for(i = 0; i < global.gitgraph.commits.length; i++) {
                commit = global.gitgraph.commits[i];
                if(commit.detailId === id && commit.isActivated === false) {
                    shouldUpdate = true;
                }
            }

            if(shouldUpdate === true) {
                for(i = 0; i < global.gitgraph.commits.length; i++) {
                    commit = global.gitgraph.commits[i];
                    if(commit.detailId === id) {
                        commit.activate();
                    } else {
                        commit.deactivate();
                    }
                }
            }
        }
    };

    global.pathgraph = {
        init: function () {
            internal.init();
        },
        highlightNodeByCard: function(card) {
            internal.highlightNodeByCard(card);
        }
    };
}(window));