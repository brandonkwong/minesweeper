/*
Name: Minesweeper
Source URI: https://github.com/brandonkwong/minesweeper
Description: A version of Minesweeper built for a software engineer problem challenge.
Version: 1.0.5 (Document last updated on 28-Apr-14)
Author: Brandon Kwong
Author URI: http://brandonkwong.com
License: MIT
*/


$(document).ready(function() {

// Board Setup
var grid = 64; // Default Size
var level = 10; // Default Difficulty

function setupBoard() {
    
    // Header
    $('header').html('Minesweeper &#xf05c;').css('color', '#444');
    
    // Tiles
    if ( $('#board').hasClass('hard') ) {
        // Hard Difficulty
        for (i = 0; i < (grid+32); i++) {
            $('#board').append('<div class="tile"></div>');
        };
        // Mines
        while ($('.mine').length < (level*2)) {
            $('.tile').eq(Math.floor(Math.random()*(grid+32))).html('<p>&#xf05c;</p>').addClass('mine');
        };
    } else {
        // Normal Difficulty
        for (i = 0; i < grid; i++) {
            $('#board').append('<div class="tile"></div>');
        };
        // Mines
        while ($('.mine').length < level) {
            $('.tile').eq(Math.floor(Math.random()*grid)).html('<p>&#xf05c;</p>').addClass('mine');
        };
    };

    // Walls
    $('.tile:nth-child(8n+1)').addClass('wall-l'); // Left Wall
    $('.tile:nth-child(8n)').addClass('wall-r'); // Right Wall

    // Numbered Tile Counter
    $.fn.numberedCounter = function() {
        $(this).addClass('numbered');
        if ($(this).html() == 1) {
            $(this).text(2);
        } else if ($(this).html() == 2) {
            $(this).text(3);
        } else if ($(this).html() == 3) {
            $(this).text(4);
        } else if ($(this).html() == 4) {
            $(this).text(5);
        } else if ($(this).html() == 5) {
            $(this).text(6);
        } else if ($(this).html() == 6) {
            $(this).text(7);
        } else if ($(this).html() == 7) {
            $(this).text(8);
        } else {
            $(this).text(1);
        };
    };

    // Numbered Tiles
    $('.mine').each(function() {
        $(this).prevAll().eq(8).not('.mine, .wall-r').numberedCounter();
        $(this).prevAll().eq(7).not('.mine').numberedCounter();
        $(this).prevAll().eq(6).not('.mine, .wall-l').numberedCounter();
        $(this).prevAll().eq(0).not('.mine, .wall-r').numberedCounter();
        $(this).nextAll().eq(0).not('.mine, .wall-l').numberedCounter();
        $(this).nextAll().eq(6).not('.mine, .wall-r').numberedCounter();
        $(this).nextAll().eq(7).not('.mine').numberedCounter();
        $(this).nextAll().eq(8).not('.mine, .wall-l').numberedCounter();
    });

    // Tile Hide
    $('.tile').css({
        background: '#eee',
        color: 'transparent'
    });
    
    // Tile Reveal
    $.fn.reveal = function() {
        if ( $(this).hasClass('numbered') ) {
            $(this).addClass('revealed').css({
                background: '#ddd',
                color: 'gray'
            });
        } else {
            $(this).addClass('empty').css('background', '#ddd');
        };
    };
    
        // Reveal Numbered Tile
        $('.numbered').on('click', function() {
            $(this).reveal();
        });
    
        // Reveal Mine Tile (Explode and lose)
        $('.mine').on('click', function() {
            $('header').text("Game Over");
            $('.mine').css('color', 'gray');
            $(this).css({
                background: '#f0707d',
                color: '#eee'
            });
            $('.numbered').not('.revealed').css('color', '#f0707d');
            $('.tile').off();
            $('#cheat').off();
            $('#validate').html('&#xf119;').off();
        });

    // Tile Scan
    $('.tile').not('.mine, .numbered').on('click', function() {
        // Scan for Empty Tiles
        $.fn.scan = function() {    
            $(this).each(function() {
                $(this).prevAll().eq(8).not('.mine, .wall-r').reveal();
                $(this).prevAll().eq(7).not('.mine').reveal();
                $(this).prevAll().eq(6).not('.mine, .wall-l').reveal();
                $(this).prevAll().eq(0).not('.mine, .wall-r').reveal();
                $(this).reveal();
                $(this).nextAll().eq(0).not('.mine, .wall-l').reveal();
                $(this).nextAll().eq(6).not('.mine, .wall-r').reveal();
                $(this).nextAll().eq(7).not('.mine').reveal();
                $(this).nextAll().eq(8).not('.mine, .wall-l').reveal();
            });
        };
        // Scan
        $(this).scan();
        $('.empty').each(function() {
            for (i = 0; i < 8; i++) {
                $('.empty').scan();
            };
        });
    });
    
    // Validate Button Reset
    $('#validate').html('&#xf00c;');

    // Validate Button
    $('#validate').on('click', function() {  
        if ( $('.numbered').not('.revealed').length == 0 ) {
            // Win Condition
            $('header').text("You Didn't Explode!").css('color', '#f0707d');
            $('.mine').css('color', 'gray');
            $(this).html('&#xf118;').off();
        } else {
            // Lose Condition
            $('header').text("Game Over");
            $('.mine').css('color', 'gray');
            $('.numbered').not('.revealed').css('color', '#f0707d');
            $('.tile').off();
            $(this).html('&#xf119;').off();
        };
    });

    // Cheat Button (Reveals all mines)
    $('#cheat').on('click', function() {
        $('.mine').css('color', 'gray');
    });

};

setupBoard();

// Buttons
$('#new').html('&#xf021;');
$('#validate').html('&#xf00c;');
$('#cheat').html('&#xf06e;');

// New Button
$('#new').on('click', function() {
    $('#board').empty();
    setupBoard();
});
    
// Level Button
$('#level').on('click', function() {
    if ( $('#board').hasClass('hard') ) {
        $('#board').removeClass('hard').animate({height: '30em'}, 'fast').empty();
        $(this).text("normal").css({
            background: '#ccc',
            color: 'gray'
        });
        setupBoard();
    } else {
        $('#board').addClass('hard').animate({height: '45em'}, 'slow').empty();
        $(this).text("hard").css({
            background: '#f0707d',
            color: '#eee'
        });
        setupBoard();
    };    
});

});