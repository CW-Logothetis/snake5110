# Snake I - Back on the Nokia 5110... with Xpress-On covers

Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Deploy Link](#deploy)
4. [Dependencies](#dependencies)
5. [Bugs](#bugs)
6. [To Do List](#todo)


## OVERVIEW <a name="overview"></a>
Learning to code the snake game took me back to 1998, when Nokia released a phone that not only had Snake 1 on it, but you could change the outer cover.

They had a classy TV add too, with a couple swapping their covers on some sun-baked Continental washing line, whilst Tarrega's 'Gran Vals' - the inspiration for the Nokia start-up jingle - played in the background (at 0:15 in the video below).

I'd just learnt to play the waltz and thought this'd be a good way to convince my parents to buy the 5110 as my first mobile.

This being 1998, and most teenagers not having mobiles, they refused.

So once I'd coded the game, I decided to put all the pieces back together again and finally have some 'closure' from my teenage trauma.

(CS pun intended)


## FEATURES <a name="features"></a>

1. A fuctioning Snake game (built in a Scrimba tutorial), re-sized and placed over the screen of a 5110 image;
2. The user can change covers to a different colour using a carousel gallery;
3. The user's score is shown;
4. The game's play button is the phone's home key
5. A YouTube embed allows the user to listen to the waltz that inspired Nokia's famous start-up sound.


## DEPLOY LINK

https://snake-nokia.netlify.app/


## DEPENDENCIES <a name="dependencies"></a>

- Scrimba snake tutorial: https://scrimba.com/learn/snakegame
- Vanilla JS carousel: https://benkimo6i.github.io/vanilla-js-carousel/


## BUGS <a name="bugs"></a>

- Putting the Snake game inside was easy. But the blue start button won't stay still when screen changes size. Need to re-look at what's going on with the percentages; they should all scale...
- when the user changes phone cover the snake game fades in/out. But the blue play button does not.
- if you change phone covers quickly, the snake game doesn't disappear fast enough.
- Text-shadows aren't great and there's an opacity/alpha issue with the five phones.


## TO DO <a name="todo"></a>

- the carousel uses a class/constructor, which is possibly a bit much for this site with only one carousel. This could be stripped down and built with less code. I was learning classes at the time I found this, so it was useful to see one in action.
- put the score in the screen, as it would be in real-life;
- show Game Over;
- at Game Over, show the score with top five scores held in local storage;
- connect YouTube API. The video isn't needed, but it's the easiest (and a free) way to use the music without breaching copyright. The API would allow play, pause, loop, volume etc buttons to be placed above the phone, or in a burger slide-in menu. This would solve the issue of the video being off screen (most wouldn't scroll down and see it), which at the moment just looks like bad UX (which it is, it's just not intended to be like that. The embed is temporary.)
- Put 'About' text in a separate page with an 'About' link in a nav bar ;
- mobile needs touch buttons adding to the phone, to control the snake with 2, 4, 6 and 8 buttons, as in real-life.