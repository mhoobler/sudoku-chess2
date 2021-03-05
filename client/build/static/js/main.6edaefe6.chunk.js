(this["webpackJsonpsudoku-chess2-client"]=this["webpackJsonpsudoku-chess2-client"]||[]).push([[0],{116:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t(0),c=t.n(a),o=t(34),i=t.n(o),s=t(27),u=t(4),l=t(5),d=t(9),j=(t(73),function(e){return"string"===typeof e.action?Object(r.jsx)(s.b,{className:"menu-button",to:e.action,children:e.text?e.text:e.children}):Object(r.jsx)("button",{className:"menu-button",onClick:e.action,children:e.text?e.text:e.children})}),f=(t(75),function(e){var n=Object(a.useState)(!1),t=Object(d.a)(n,2),o=t[0],i=t[1];Object(a.useEffect)((function(){i(!0)}),[]);var s=function(){i(!1),setTimeout((function(){e.handleModal()}),e.timer)};return Object(r.jsx)("div",{className:"\n      modal-container \n      ".concat(o?"show":"hide"," \n      "),style:{transitionDuration:e.timer+"ms"},"data-modal":"modal",children:c.a.Children.map(e.children,(function(e){return c.a.isValidElement(e)?c.a.cloneElement(e,{handleHide:s}):e}))})}),b=function(e){return e.handleModal?Object(r.jsxs)("div",{id:"login",onClick:e.handleModal,children:[" ","Login"," "]}):Object(r.jsx)("div",{id:"login",children:" Signed in "})},h=t(20),O=(t(76),t(31)),m=t.n(O),p=t(45),v=(t(36),function(e,n){return{type:"SET_BOARD",payload:{board:e,isPlayer:n}}}),x=(t(79),Object(l.b)(null,{signInSomeAuth:function(e){return{type:"SET_UID",payload:{uid:e}}}})((function(e){return Object(r.jsxs)("div",{className:"modal-content",children:[Object(r.jsxs)("div",{className:"modal-header",children:[Object(r.jsx)("button",{className:"fa fa-arrow-left",onClick:e.handleHide}),Object(r.jsx)("h4",{children:"Login"})]}),Object(r.jsx)("div",{className:"modal-body",children:Object(r.jsxs)(j,{action:function(){return function(n){var t=function(){switch(n){case"GOOGLE":return new h.a.auth.GoogleAuthProvider;default:window.alert("Sorry there was an error with the authetication process")}}();t&&h.a.auth().signInWithPopup(t).then((function(n){var t,r=null===(t=h.a.auth().currentUser)||void 0===t?void 0:t.uid;r?(e.signInSomeAuth(r),e.handleHide()):console.warn("Did not receive uid")})).catch((function(e){window.alert("Sorry there was an error with the Google provier process"),console.log(e)})).finally(e.handleHide)}("GOOGLE")},children:[Object(r.jsx)("span",{className:"menu-button-icon fa fa-google"})," Google"]})})]})}))),y=(t(80),function(){var e=Object(a.useState)(!1),n=Object(d.a)(e,2),t=n[0],c=n[1],o=Object(l.c)((function(e){return{uid:e.user.uid}})).uid,i=function(){c(!t)};return Object(r.jsxs)("div",{className:"menu-container",children:[t?Object(r.jsx)(f,{timer:400,handleModal:i,children:Object(r.jsx)(x,{handleHide:function(){console.warn("LoginMenu failed to load proper props")}})}):null,Object(r.jsxs)("div",{className:"menu-header",children:[Object(r.jsx)("h1",{children:" SuGoKu "}),Object(r.jsx)(b,{handleModal:null===o&&i})]}),Object(r.jsx)(j,{action:"/create",text:"Create Game"}),Object(r.jsx)(j,{action:"/join",text:"Join Game"})]})}),g=Object(l.b)((function(e){return{uid:e.user.uid}}),{newGame:function(e,n){return function(t,r){var a=r().user.conn;console.log(a),a.emit("NEW_GAME",{size:e,uid:n},function(){var e=Object(p.a)(m.a.mark((function e(n){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n;case 2:r=e.sent,t(v(r,1));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}})((function(e){var n=function(n){console.log(n),e.newGame(n,e.uid?e.uid:"Anon")};return Object(r.jsxs)("div",{className:"menu-container",children:[Object(r.jsxs)("div",{className:"menu-header",children:[Object(r.jsx)("h1",{children:" Create Game "}),Object(r.jsx)("h4",{children:" Select Board Size "})]}),Object(r.jsx)(j,{action:function(){return n(81)},text:"9x9"}),Object(r.jsx)(j,{action:function(){return n(256)},text:"14x14"})]})})),N=Object(l.b)((function(e){return{conn:e.user.conn,uid:e.user.uid}}),{joinGame:function(e,n){return function(t,r){r().user.conn.emit("JOIN_GAME",{_id:e,uid:n},function(){var e=Object(p.a)(m.a.mark((function e(n){var r;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,n;case 2:r=e.sent,t(v(r,2));case 4:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}())}}})((function(e){var n=Object(a.useState)([]),t=Object(d.a)(n,2),c=t[0],o=t[1];Object(a.useEffect)((function(){e.conn.emit("GET_GAMES",null,(function(e){o(e)}))}),[e.conn]);return Object(r.jsxs)("div",{className:"menu-container",children:[Object(r.jsx)("h1",{children:"JoinGame"}),c.map((function(n,t){return Object(r.jsx)(j,{text:n,action:function(){return function(n){e.joinGame(n,e.uid?e.uid:"Anon")}(n)}},t)}))]})})),S=t(30),A=function(e){var n=Object(a.useState)(e.value),t=Object(d.a)(n,2),c=t[0],o=t[1],i=function(n){"Enter"===n.key&&e.handleTurn(e.index,c)};return Object(a.useEffect)((function(){var e=document.getElementsByClassName("infocus");e[0]&&e[0].addEventListener("keyup",i)}),[c]),Object(r.jsx)("input",{className:"input-cell ".concat(0===e.value?"infocus":"nofocus"),type:"number",min:0,max:e.n*e.n,value:e.value>0?Number(e.value).toString():Number(c).toString(),onChange:function(e){var n=parseInt(e.currentTarget.value);o(n)},disabled:e.value>0})},T=t(61),w={initGrid:function(e,n){for(var t=n*n,r=new Array(t*t).fill(0),a=new Array(t*t).fill(0),c=0;c<e.length;c++){var o=e[c];r[o.index]=o.value,a[o.index]=o.player;var i=w.autoComplete(o.index,r,3);if(console.log(i),i){var s,u=Object(T.a)(i);try{for(u.s();!(s=u.n()).done;){var l=s.value;0!==l.value&&(r[l.index]=l.value,a[l.index]=o.player)}}catch(d){u.e(d)}finally{u.f()}}}return{values:r,players:a}},getRow:function(e,n){var t=n*n,r=~~(e/t)*t;return Array.from(Array(t).keys()).map((function(e){return r+e}))},getCol:function(e,n){var t=n*n,r=e%t;return Array.from(Array(t).keys()).map((function(e){return r+t*e}))},getBox:function(e,n){for(var t=n*n,r=~~(e/(t*n))*t*n+~~(e%t/n)*n,a=[],c=0;c<n;c++)for(var o=0;o<n;o++)a.push(r+o+c*t);return a},getGroupSet:function(e,n,t){var r=w.getBox(e,t).concat(w.getCol(e,t)).concat(w.getRow(e,t)).map((function(e){return n[e]}));return new Set(r)},testInput:function(e,n,t,r){var a=w.getGroupSet(e,n,t);return r>0&&r<=t*t&&(!a.has(r)||Array.from(new Set([w.getRow(e,t),w.getCol(e,t),w.getBox(e,t)].flat())).filter((function(e){return n[e]===r})))},autoComplete:function(e,n,t){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[],a=new Set([w.getRow(e,t),w.getCol(e,t),w.getBox(e,t)].flat()),c=Array.from(a).map((function(e){return{set:w.getGroupSet(e,n,t),index:e}})).filter((function(e){return e.set.size===t*t&&0===n[e.index]}));if(console.log(c),c.length>0){var o=Object(S.a)(n),i=c.map((function(e){e.set.delete(0);for(var n=Array.from(e.set),r=Array(t*t).fill(!1),a=0;a<n.length;a++)r[n[a]-1]=!0;var i={index:e.index,value:r.findIndex((function(e){return!e}))+1};return o[i.index]=i.value,c.forEach((function(e){return e.set.add(i.value)})),i})),s=i.map((function(e){return w.autoComplete(e.index,o,t,[].concat(Object(S.a)(r),[e]))})),u=i.concat(s).flat();return console.log(u),Array.from(u)}return r}},E=w,G=(t(81),function(e){for(var n=Array.from(E.getGroupSet(e.index,e.values,e.n)),t=Array(e.n*e.n).fill(!1),a=0,c=n;a<c.length;a++){var o=c[a];o>0&&(t[o-1]=!0)}return Object(r.jsx)("div",{className:"hint-cell hint-cell-".concat(e.n),children:t.map((function(e,n){return e?Object(r.jsx)("div",{children:n+1},n):Object(r.jsx)("div",{children:"\xa0"},n)}))})}),_=(t(82),Object(l.b)((function(e){return{focus:e.game.focus,hintStyle:e.game.hintStyle}}),{setFocus:function(e){return{type:"SET_FOCUS",payload:{focus:e}}}})((function(e){var n=Math.sqrt(Math.sqrt(e.values.length)),t=function(e){var t="";return e%(n*n)===0&&(t+="left "),e%n===n-1&&(t+="right "),0===~~(e/(n*n))&&(t+="top "),~~(e/(n*n))%n===n-1&&(t+="bottom "),t},a=new Set(e.errors);return Object(r.jsx)("div",{className:"grid-container-".concat(n),children:e.values.map((function(c,o){return Object(r.jsxs)("div",{className:"grid-cell ".concat(t(o),"cell-size-").concat(n," player-").concat(e.players[o]," ").concat(a.has(o)?"cell-error":""),onClick:function(){return e.setFocus(o)},children:[a.has(o)?Object(r.jsx)("div",{className:"error-dot",children:Object(r.jsx)("div",{})}):null,e.focus===o||c>0?Object(r.jsx)(A,{player:e.players[o],value:c,index:o,n:n,handleTurn:e.handleTurn}):Object(r.jsx)(G,{index:o,n:n,values:e.values})]},o)}))})}))),U=function(e){return Object(r.jsxs)("div",{className:"score-card",children:[Object(r.jsx)("div",{className:"player-dot player-".concat(e.label," ").concat(e.isTurn?"isturn":null),children:"\xa0"}),Object(r.jsxs)("h4",{className:"player-label",children:[e.isPlayer===e.label?"You":"Them",":\xa0",e.sum]})]})},I=(t(83),function(e){var n=function(e,n){return e+n};return Object(r.jsxs)("div",{className:"game-sidebar-left",children:[Object(r.jsx)("h2",{children:"Score"}),Object(r.jsx)(U,{isTurn:1===e.isTurn,isPlayer:e.isPlayer,label:1,sum:e.players.filter((function(e){return 1===e})).reduce(n,0)}),Object(r.jsx)(U,{isTurn:2===e.isTurn,isPlayer:e.isPlayer,label:2,sum:e.players.filter((function(e){return 2===e})).reduce(n,0)/2}),e.errors.types.map((function(n,t){return function(n,t){switch(n){case"BAD_INPUT":return Object(r.jsxs)("div",{className:"error",children:["Move was blocked by ",e.errors.cells.length>1?"cells":"cell",":","\xa0",e.errors.cells.map((function(n,t){return Object(r.jsx)("span",{children:e.errors.cells.length-1!==t?n+",\xa0":n},t)}))]},t);case"NOT_TURN":return Object(r.jsx)("div",{className:"error",children:"It's not your turn"},t);case"BIG_NUM":return Object(r.jsxs)("div",{className:"error",children:["Number must be less than ",Math.sqrt(e.players.length)+1]},t);case"ZERO_NUM":return Object(r.jsx)("div",{className:"error",children:"Number must be greater than 0"},t);default:return Object(r.jsx)("div",{className:"error",children:"Error"},t)}}(n,t)}))]})}),P=(t(84),Object(l.b)((function(e){return{focus:e.game.focus,hintStyle:e.game.hintStyle,isPlayer:e.game.isPlayer}}),{setTurnArr:function(e){return{type:"SET_TURNS",payload:{turnArr:e}}}})((function(e){var n=Math.sqrt(Math.sqrt(e.board.size)),t=Object(a.useState)({values:Array(e.board.size).fill(0),players:Array(e.board.size).fill(0)}),o=Object(d.a)(t,2),i=o[0],s=o[1],u=Object(a.useState)({types:[],cells:[]}),l=Object(d.a)(u,2),j=l[0],f=l[1],b=Object(a.useState)(2===e.isPlayer),h=Object(d.a)(b,2),O=h[0],m=h[1],p=Object(a.useState)(!1),v=Object(d.a)(p,2),x=v[0],y=v[1],g=e.board.turnArr,N=g.length,A=N>0&&1===g[N-1].player?2:1;Object(a.useEffect)((function(){var t=E.initGrid(e.board.turnArr,n);return t.values!==i.values&&s(t),e.conn.on("PLAYER_JOIN",(function(){m(!0)})),e.conn.on("USER_QUIT",(function(){y(!0)})),e.conn.on("UPDATE_TURN",(function(n){e.setTurnArr(n.turnArr)})),function(){e.conn.off("UPDATE_TURN"),e.conn.off("USER_QUIT"),e.conn.off("UPDATE_TURN")}}),[e.board,x]);return Object(r.jsx)("div",{className:"game-container",children:x?Object(r.jsxs)("div",{className:"pre-game",children:[Object(r.jsx)("h4",{children:" Uh oh, it looks like the other player quit the game! "}),Object(r.jsxs)("h4",{children:[" ","Currently there is no way for someone to rejoin a game, sorry :("]})]}):O?Object(r.jsxs)(c.a.Fragment,{children:[Object(r.jsx)(I,{players:i.players,errors:j,isTurn:A,isPlayer:e.isPlayer}),Object(r.jsx)(_,{errors:j.cells,players:i.players,values:i.values,handleTurn:function(t,r){console.log(A);var a=E.testInput(t,i.values,n,r),c=e.isPlayer===A,o={types:[],cells:[]};if(!0===a&&c&&r>0&&r<=n*n){var s={gameID:e.board._id,player:e.isPlayer,index:t,value:r};e.conn.emit("ADD_TURN",s)}"boolean"!==typeof a&&0!==r&&(o={types:[].concat(Object(S.a)(o.types),["BAD_INPUT"]),cells:a}),c||o.types.push("NOT_TURN"),r<1&&o.types.push("ZERO_NUM"),r>n*n&&o.types.push("BIG_NUM"),f(o)}}),Object(r.jsx)("div",{className:"game-sidebar-right",children:"\xa0"})]}):Object(r.jsxs)("div",{className:"pre-game",children:[Object(r.jsx)("h4",{children:"Waiting for player to join you"}),Object(r.jsxs)("h4",{children:["You're Game ID is: ",e.board._id," "]})]})})}))),k=(t(85),Object(u.g)(Object(l.b)((function(e){return{conn:e.user.conn,board:e.game.board}}),{})((function(e){var n=Object(u.f)();return Object(a.useEffect)((function(){0===h.a.apps.length&&h.a.initializeApp({apiKey:"AIzaSyCagthgvuZJCzGOIIzgsRbUH9lgG1kq8EI",authDomain:"sugoku-3f76a.firebaseapp.com",projectId:"sugoku-3f76a",appId:"1:11174919362:web:9c8e6fb349fb0f6692cf5b"}),null!==e.board&&"/game"!==n.location.pathname&&n.push("/game")}),[e.board]),Object(r.jsx)("div",{className:"App",children:Object(r.jsxs)(u.c,{children:[Object(r.jsx)(u.a,{path:"/game",children:Object(r.jsx)(P,{board:e.board,conn:e.conn})}),Object(r.jsx)(u.a,{path:"/create",children:Object(r.jsx)(g,{})}),Object(r.jsx)(u.a,{path:"/join",children:Object(r.jsx)(N,{})}),Object(r.jsx)(u.a,{exact:!0,path:"/",children:Object(r.jsx)(y,{})})]})})})))),C=t(19),M=t(62),R=t(6),D=t(63),B={string:"",conn:t.n(D)()("wss://sudoku-chess2.herokuapp.com/",{transports:["websocket"]}),uid:null},z=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:B,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"TEST":var t=n.payload.string;return Object(R.a)(Object(R.a)({},e),{},{string:t});case"SET_UID":var r=n.payload.uid;return Object(R.a)(Object(R.a)({},e),{},{uid:r});default:return Object(R.a)({},e)}},q={board:null,target:0,hintStyle:"default",focus:0,isPlayer:void 0},J=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:q,n=arguments.length>1?arguments[1]:void 0;switch(n.type){case"SET_BOARD":var t=n.payload,r=t.board,a=t.isPlayer;return Object(R.a)(Object(R.a)({},e),{},{board:r,isPlayer:a});case"SET_FOCUS":var c=n.payload.focus;return Object(R.a)(Object(R.a)({},e),{},{focus:c});case"SET_TURNS":var o=n.payload.turnArr;return Object(R.a)(Object(R.a)({},e),{},{board:Object(R.a)(Object(R.a)({},e.board),{},{turnArr:o})});default:return Object(R.a)({},e)}},L=Object(C.c)({user:z,game:J}),H=Object(C.d)(L,Object(C.a)(M.a));i.a.render(Object(r.jsx)(l.a,{store:H,children:Object(r.jsx)(c.a.StrictMode,{children:Object(r.jsx)(s.a,{children:Object(r.jsx)(k,{})})})}),document.getElementById("root"))},73:function(e,n,t){},75:function(e,n,t){},79:function(e,n,t){},80:function(e,n,t){},81:function(e,n,t){},82:function(e,n,t){},83:function(e,n,t){},84:function(e,n,t){},85:function(e,n,t){}},[[116,1,2]]]);
//# sourceMappingURL=main.6edaefe6.chunk.js.map