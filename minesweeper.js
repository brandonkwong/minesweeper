/*
Name: Minesweeper
Source URI: https://github.com/brandonkwong/minesweeper
Description: A version of Minesweeper built for a software engineer problem challenge.
Version: 1.0.7 (Document last updated on 1-May-14)
Author: Brandon Kwong
Author URI: http://brandonkwong.com
License: MIT
*/


$(document).ready(function() {

// Default Settings
var grid = 64;
var level = 10;

// Board Setup
var $header = $('#title');
var $board = $('#board');
var $new = $('#new');
var $validate = $('#validate');
var $cheat = $('#cheat');
var $level = $('#level');

function setupBoard() {

    // Header
    $header.html('Minesweeper &#xf05c;').css('color', '#444');

    // Tiles
    if ($board.hasClass('hard')) {
        // Hard Difficulty
        for (i = 0; i < (grid+32); i++) {
            $board.append('<div class="tile"></div>');
        };
        while ($('.mine').length < (level*2)) { // Mines
            $('.tile').eq(Math.floor(Math.random()*(grid+32))).html('<p>&#xf05c;</p>').addClass('mine');
        };
    } else {
        // Normal Difficulty
        for (i = 0; i < grid; i++) {
            $board.append('<div class="tile"></div>');
        };
        while ($('.mine').length < level) { // Mines
            $('.tile').eq(Math.floor(Math.random()*grid)).html('<p>&#xf05c;</p>').addClass('mine');
        };
    };
    var $tile = $('.tile');
    var $mine = $('.mine');    

    // Walls
    $tile.filter(':nth-child(8n+1)').addClass('wall-l'); // Left Wall
    $tile.filter(':nth-child(8n)').addClass('wall-r'); // Right Wall

    // Numbered Tile Counter
    $.fn.numberedCounter = function() {
        var $num = $(this);
        $num.addClass('numbered');
        if ($num.html() == 1) {
            $num.text(2);
        } else if ($num.html() == 2) {
            $num.text(3);
        } else if ($num.html() == 3) {
            $num.text(4);
        } else if ($num.html() == 4) {
            $num.text(5);
        } else if ($num.html() == 5) {
            $num.text(6);
        } else if ($num.html() == 6) {
            $num.text(7);
        } else if ($num.html() == 7) {
            $num.text(8);
        } else {
            $num.text(1);
        };
    };

    // Numbered Tiles
    $mine.each(function() {
        var $numTile = $(this);
        $numTile.prevAll().eq(8).not('.mine, .wall-r').numberedCounter();
        $numTile.prevAll().eq(7).not('.mine').numberedCounter();
        $numTile.prevAll().eq(6).not('.mine, .wall-l').numberedCounter();
        $numTile.prevAll().eq(0).not('.mine, .wall-r').numberedCounter();
        $numTile.nextAll().eq(0).not('.mine, .wall-l').numberedCounter();
        $numTile.nextAll().eq(6).not('.mine, .wall-r').numberedCounter();
        $numTile.nextAll().eq(7).not('.mine').numberedCounter();
        $numTile.nextAll().eq(8).not('.mine, .wall-l').numberedCounter();
    });
    var $numbered = $('.numbered');

    // Tile Hide
    $tile.css({
        background: '#eee',
        color: 'transparent'
    });

    // Tile Reveal
    $.fn.reveal = function() {
        if ($(this).hasClass('numbered')) {
            $(this).addClass('revealed').css({
                background: '#ddd',
                color: 'gray'
            });
        } else {
            $(this).addClass('empty revealed').css('background', '#ddd');
        };
    };

    // Reveal Numbered Tile
    $numbered.on('click', function() {
        $(this).reveal();
    });

    // Reveal Mine Tile (Explode and lose)
    $mine.on('click', function() {
        $header.text("Game Over");
        $mine.css('color', 'gray');
        $(this).css({
            background: '#f0707d',
            color: '#eee'
        });
        $numbered.not('.revealed').css('color', '#f0707d');
        $tile.off();
        $('#cheat').off();
        $('#validate').html('&#xf119;').off();
    });

    // Scan for Empty Tiles
    $.fn.scan = function() {
        $(this).each(function() {
            var $scan = $(this);
            $scan.prevAll().eq(8).not('.mine, .wall-r').reveal();
            $scan.prevAll().eq(7).not('.mine').reveal();
            $scan.prevAll().eq(6).not('.mine, .wall-l').reveal();
            $scan.prevAll().eq(0).not('.mine, .wall-r').reveal();
            $scan.reveal();
            $scan.nextAll().eq(0).not('.mine, .wall-l').reveal();
            $scan.nextAll().eq(6).not('.mine, .wall-r').reveal();
            $scan.nextAll().eq(7).not('.mine').reveal();
            $scan.nextAll().eq(8).not('.mine, .wall-l').reveal();
        });
    };    

    // Tile Scan
    $tile.not('.mine, .numbered').on('click', function() {
        // Initial Scan
        $(this).scan();
        // Progressive Scan
        $('.empty').each(function() {
            for (i = 0; i < 8; i++) {
                $('.empty').scan();
            };
        });
    });

    // Validate Button Reset
    $validate.html('&#xf00c;');

    // Validate Button
    $validate.on('click', function() {  
        if ($tile.not('.revealed, .mine').length == 0) {
            // Win Condition
            $header.text("You Didn't Explode!").css('color', '#f0707d');
            $mine.css('color', 'gray');
            $(this).html('&#xf118;').off();
        } else {
            // Lose Condition
            $header.text("Game Over");
            $mine.css('color', 'gray');
            $numbered.not('.revealed').css('color', '#f0707d');
            $tile.off();
            $(this).html('&#xf119;').off();
        };
    });

    // Cheat Button (Reveals all mines)
    $cheat.on('click', function() {
        $mine.css('color', 'gray');
    });

};
setupBoard();

// Buttons
$new.html('&#xf021;');
$validate.html('&#xf00c;');
$cheat.html('&#xf06e;');
$level.text("normal");

// New Button
$new.add($header).on('click', function() {
    $board.empty();
    setupBoard();
});
    
// Level Button
$level.on('click', function() {
    if ($board.hasClass('hard')) {
        $board.removeClass('hard').animate({height: '30em'}, 'fast').empty();
        $(this).text("normal").css({
            background: '#ccc',
            color: 'gray'
        });
        setupBoard();
    } else {
        $board.addClass('hard').animate({height: '45em'}, 'slow').empty();
        $(this).text("hard").css({
            background: '#f0707d',
            color: '#eee'
        });
        setupBoard();
    };    
});

});