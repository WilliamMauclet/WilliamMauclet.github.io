Elm.Main = Elm.Main || {};
Elm.Main.make = function (_elm) {
   "use strict";
   _elm.Main = _elm.Main || {};
   if (_elm.Main.values)
   return _elm.Main.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   _A = _N.Array.make(_elm),
   _E = _N.Error.make(_elm),
   $moduleName = "Main",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Keyboard = Elm.Keyboard.make(_elm),
   $List = Elm.List.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Time = Elm.Time.make(_elm);
   var player = F3(function (c,
   t,
   o) {
      return {_: {}
             ,c: c
             ,o: o
             ,t: t};
   });
   var Game = F3(function (a,b,c) {
      return {_: {}
             ,player1: b
             ,player2: c
             ,state: a};
   });
   var Player = F3(function (a,
   b,
   c) {
      return {_: {}
             ,c: a
             ,o: c
             ,t: b};
   });
   var Win2 = {ctor: "Win2"};
   var Win1 = {ctor: "Win1"};
   var Play = {ctor: "Play"};
   var Start = {ctor: "Start"};
   var delta = A2($Signal._op["<~"],
   $Time.inSeconds,
   $Time.fps(35));
   var Input = F3(function (a,
   b,
   c) {
      return {_: {}
             ,dir1: b
             ,dir2: c
             ,space: a};
   });
   var input = A2($Signal.sampleOn,
   delta,
   A2($Signal._op["~"],
   A2($Signal._op["~"],
   A2($Signal._op["<~"],
   Input,
   $Keyboard.space),
   $Keyboard.wasd),
   $Keyboard.arrows));
   var tailLength = 60;
   var speed = 4;
   var tailWidth = 2;
   var showTail = F2(function (color,
   positions) {
      return A2($Graphics$Collage.traced,
      _U.replace([["width",tailWidth]
                 ,["color",color]],
      $Graphics$Collage.defaultLine),
      $Graphics$Collage.path(positions));
   });
   var W = {ctor: "W"};
   var S = {ctor: "S"};
   var E = {ctor: "E"};
   var startGame = {_: {}
                   ,player1: A3(player,
                   $Color.red,
                   _L.fromArray([{ctor: "_Tuple2"
                                 ,_0: -400
                                 ,_1: 0}]),
                   E)
                   ,player2: A3(player,
                   $Color.green,
                   _L.fromArray([{ctor: "_Tuple2"
                                 ,_0: 400
                                 ,_1: 0}]),
                   W)
                   ,state: Start};
   var defaultGame = {_: {}
                     ,player1: A3(player,
                     $Color.red,
                     _L.fromArray([{ctor: "_Tuple2"
                                   ,_0: -400
                                   ,_1: 0}]),
                     E)
                     ,player2: A3(player,
                     $Color.green,
                     _L.fromArray([{ctor: "_Tuple2"
                                   ,_0: 400
                                   ,_1: 0}]),
                     W)
                     ,state: Play};
   var N = {ctor: "N"};
   var $continue = function (plyr) {
      return function () {
         var y = $Basics.snd($List.head(plyr.t));
         var x = $Basics.fst($List.head(plyr.t));
         return _U.eq(plyr.o,
         N) ? A3(player,
         plyr.c,
         A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: x
         ,_1: y + speed},
         A2($List.take,
         tailLength,
         plyr.t)),
         plyr.o) : _U.eq(plyr.o,
         W) ? A3(player,
         plyr.c,
         A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: x - speed
         ,_1: y},
         A2($List.take,
         tailLength,
         plyr.t)),
         plyr.o) : _U.eq(plyr.o,
         E) ? A3(player,
         plyr.c,
         A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: x + speed
         ,_1: y},
         A2($List.take,
         tailLength,
         plyr.t)),
         plyr.o) : _U.eq(plyr.o,
         S) ? A3(player,
         plyr.c,
         A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: x
         ,_1: y - speed},
         A2($List.take,
         tailLength,
         plyr.t)),
         plyr.o) : _E.If($moduleName,
         "between lines 83 and 86");
      }();
   };
   var intToOrient = function (_v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return function () {
                 var _v4 = {ctor: "_Tuple2"
                           ,_0: _v0._0
                           ,_1: _v0._1};
                 switch (_v4.ctor)
                 {case "_Tuple2": switch (_v4._0)
                      {case -1: return W;
                         case 1: return E;}
                      switch (_v4._1)
                      {case -1: return S;
                         case 1: return N;}
                      break;}
                 _E.Case($moduleName,
                 "between lines 90 and 94");
              }();}
         _E.Case($moduleName,
         "between lines 90 and 94");
      }();
   };
   var stepPlayer = F2(function (_v7,
   plyr) {
      return function () {
         return _U.eq({ctor: "_Tuple2"
                      ,_0: _v7.x
                      ,_1: _v7.y},
         {ctor: "_Tuple2"
         ,_0: 0
         ,_1: 0}) ? $continue(plyr) : _U.eq(intToOrient({ctor: "_Tuple2"
                                                        ,_0: _v7.x
                                                        ,_1: _v7.y}),
         plyr.o) ? $continue(plyr) : A3(player,
         plyr.c,
         plyr.t,
         intToOrient({ctor: "_Tuple2"
                     ,_0: _v7.x
                     ,_1: _v7.y}));
      }();
   });
   var playerH = 16;
   var playerW = 64;
   var showPlayer$ = F3(function (color,
   _v9,
   o) {
      return function () {
         switch (_v9.ctor)
         {case "_Tuple2":
            return function () {
                 var fw = $Basics.toFloat(playerW);
                 var $ = function () {
                    switch (o.ctor)
                    {case "E":
                       return {ctor: "_Tuple3"
                              ,_0: fw / 2
                              ,_1: 0
                              ,_2: 0};
                       case "N":
                       return {ctor: "_Tuple3"
                              ,_0: 0
                              ,_1: fw / 2
                              ,_2: 90};
                       case "S":
                       return {ctor: "_Tuple3"
                              ,_0: 0
                              ,_1: (0 - fw) / 2
                              ,_2: -90};
                       case "W":
                       return {ctor: "_Tuple3"
                              ,_0: (0 - fw) / 2
                              ,_1: 0
                              ,_2: 180};}
                    _E.Case($moduleName,
                    "between lines 16 and 21");
                 }(),
                 xOffset = $._0,
                 yOffset = $._1,
                 degs = $._2;
                 return $Graphics$Collage.rotate($Basics.degrees(degs))($Graphics$Collage.move({ctor: "_Tuple2"
                                                                                               ,_0: xOffset
                                                                                               ,_1: yOffset})($Graphics$Collage.move({ctor: "_Tuple2"
                                                                                                                                     ,_0: _v9._0
                                                                                                                                     ,_1: _v9._1})($Graphics$Collage.outlined($Graphics$Collage.solid(color))(A2($Graphics$Collage.rect,
                 fw,
                 $Basics.toFloat(playerH))))));
              }();}
         _E.Case($moduleName,
         "between lines 15 and 25");
      }();
   });
   var collide = F3(function (_v14,
   o,
   t) {
      return function () {
         switch (_v14.ctor)
         {case "_Tuple2": return _U.eq(t,
              _L.fromArray([])) ? false : function () {
                 var y$ = $Basics.snd($List.head(t));
                 var x$ = $Basics.fst($List.head(t));
                 return function () {
                    switch (o.ctor)
                    {case "E":
                       return _U.cmp(x$ - _v14._0,
                         0) > 0 && (_U.cmp(x$ - _v14._0,
                         playerW) < 0 && _U.cmp($Basics.abs(y$ - _v14._1),
                         playerH / 2) < 0) || A3(collide,
                         {ctor: "_Tuple2"
                         ,_0: _v14._0
                         ,_1: _v14._1},
                         o,
                         $List.tail(t));
                       case "N":
                       return _U.cmp($Basics.abs(x$ - _v14._0),
                         playerH / 2) < 0 && (_U.cmp(y$ - _v14._1,
                         0) > 0 && _U.cmp(y$ - _v14._1,
                         playerW) < 0) || A3(collide,
                         {ctor: "_Tuple2"
                         ,_0: _v14._0
                         ,_1: _v14._1},
                         o,
                         $List.tail(t));
                       case "S":
                       return _U.cmp($Basics.abs(x$ - _v14._0),
                         playerH / 2) < 0 && (_U.cmp(_v14._1 - y$,
                         0) > 0 && _U.cmp(_v14._1 - y$,
                         playerW) < 0) || A3(collide,
                         {ctor: "_Tuple2"
                         ,_0: _v14._0
                         ,_1: _v14._1},
                         o,
                         $List.tail(t));
                       case "W":
                       return _U.cmp(_v14._0 - x$,
                         0) > 0 && (_U.cmp(_v14._0 - x$,
                         playerW) < 0 && _U.cmp($Basics.abs(y$ - _v14._1),
                         playerH / 2) < 0) || A3(collide,
                         {ctor: "_Tuple2"
                         ,_0: _v14._0
                         ,_1: _v14._1},
                         o,
                         $List.tail(t));}
                    _E.Case($moduleName,
                    "between lines 102 and 106");
                 }();
              }();}
         _E.Case($moduleName,
         "between lines 98 and 106");
      }();
   });
   var height = 768;
   var width = 1024;
   var outOfBounds = F2(function (_v19,
   o) {
      return function () {
         switch (_v19.ctor)
         {case "_Tuple2":
            return function () {
                 switch (o.ctor)
                 {case "E":
                    return _U.cmp(_v19._0 + playerW,
                      width / 2) > 0;
                    case "N":
                    return _U.cmp(_v19._1 + playerW,
                      height / 2) > 0;
                    case "S":
                    return _U.cmp(_v19._1 - playerW,
                      (0 - height) / 2) < 0;
                    case "W":
                    return _U.cmp(_v19._0 - playerW,
                      (0 - width) / 2) < 0;}
                 _E.Case($moduleName,
                 "between lines 110 and 115");
              }();}
         _E.Case($moduleName,
         "between lines 110 and 115");
      }();
   });
   var checkVictory = F2(function (player1,
   player2) {
      return A3(collide,
      $List.head(player2.t),
      player2.o,
      $List.tail(player1.t)) || (A3(collide,
      $List.head(player2.t),
      player2.o,
      $List.tail(player2.t)) || A2(outOfBounds,
      $List.head(player2.t),
      player2.o));
   });
   var stepGame = F2(function (_v24,
   _v25) {
      return function () {
         return function () {
            return function () {
               var player2won = A2(checkVictory,
               _v25.player2,
               _v25.player1);
               var player1won = A2(checkVictory,
               _v25.player1,
               _v25.player2);
               return _v24.space ? defaultGame : player1won ? _U.replace([["state"
                                                                          ,Win1]
                                                                         ,["player1"
                                                                          ,_v25.player1]
                                                                         ,["player2"
                                                                          ,_v25.player2]],
               _v25) : player2won ? _U.replace([["state"
                                                ,Win2]
                                               ,["player1",_v25.player1]
                                               ,["player2",_v25.player2]],
               _v25) : _U.eq(_v25.state,
               Play) ? _U.replace([["state"
                                   ,Play]
                                  ,["player1"
                                   ,A2(stepPlayer,
                                   _v24.dir1,
                                   _v25.player1)]
                                  ,["player2"
                                   ,A2(stepPlayer,
                                   _v24.dir2,
                                   _v25.player2)]],
               _v25) : _v25;
            }();
         }();
      }();
   });
   var gameState = A3($Signal.foldp,
   stepGame,
   startGame,
   input);
   var display = function (_v28) {
      return function () {
         return _U.eq(_v28.state,
         Start) ? $Text.plainText("press space to start") : _U.eq(_v28.state,
         Win1) ? $Text.plainText("Player 1 won!") : _U.eq(_v28.state,
         Win2) ? $Text.plainText("Player 2 won!") : A3($Graphics$Collage.collage,
         width,
         height,
         _L.fromArray([A2($Graphics$Collage.filled,
                      $Color.black,
                      A2($Graphics$Collage.rect,
                      width,
                      height))
                      ,A3(showPlayer$,
                      $Color.lightBlue,
                      $List.head(_v28.player1.t),
                      _v28.player1.o)
                      ,A2(showTail,
                      $Color.lightBlue,
                      $List.tail(_v28.player1.t))
                      ,A3(showPlayer$,
                      $Color.orange,
                      $List.head(_v28.player2.t),
                      _v28.player2.o)
                      ,A2(showTail,
                      $Color.orange,
                      $List.tail(_v28.player2.t))
                      ,A2($Graphics$Collage.move,
                      {ctor: "_Tuple2",_0: 512,_1: 0},
                      A2($Graphics$Collage.filled,
                      $Color.blue,
                      A2($Graphics$Collage.rect,
                      4,
                      4)))]));
      }();
   };
   var main = A2($Signal.lift,
   display,
   gameState);
   _elm.Main.values = {_op: _op
                      ,width: width
                      ,height: height
                      ,playerW: playerW
                      ,playerH: playerH
                      ,N: N
                      ,E: E
                      ,S: S
                      ,W: W
                      ,showPlayer$: showPlayer$
                      ,tailWidth: tailWidth
                      ,showTail: showTail
                      ,speed: speed
                      ,tailLength: tailLength
                      ,Input: Input
                      ,delta: delta
                      ,input: input
                      ,Start: Start
                      ,Play: Play
                      ,Win1: Win1
                      ,Win2: Win2
                      ,Player: Player
                      ,Game: Game
                      ,player: player
                      ,startGame: startGame
                      ,defaultGame: defaultGame
                      ,stepPlayer: stepPlayer
                      ,$continue: $continue
                      ,intToOrient: intToOrient
                      ,collide: collide
                      ,outOfBounds: outOfBounds
                      ,checkVictory: checkVictory
                      ,stepGame: stepGame
                      ,gameState: gameState
                      ,display: display
                      ,main: main};
   return _elm.Main.values;
};