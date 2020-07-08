// Neue Scene namens LevelOne:
var gameScene = new Phaser.Scene('LevelOne');
var gameSceneTwo = new Phaser.Scene('LevelTwo');
var gameSceneThree = new Phaser.Scene('LevelThree');
// Scenen eigene Spiele Konfiguration:
var config = {
    type : Phaser.AUTO, // entscheidet selbst ob WebGL | Canvas verwendet werden soll.
    width : 640,
    height : 320,
    scene : [gameScene, gameSceneTwo], // Checkmal ab ob du hier eine Änderung machst, zweite Gamescene
    physics : {
        default : 'arcade',
        arcade : {
            gravity : { y : 300 },
            debug : false
        }
    },
    audio : {
        mute : false,
        volumen : 1,
        rate : 1,
        detune : 0,
        seek : 0,
        loop : true,
        delay : 0
    }
};
// erstellt das Spiel und übergibt dem die Einstellungen:
var spiel = new Phaser.Game(config);
// map01 = Skyline, map02 = Forrest
var map01, map02;
var tilesMario;
var player;
var camera;
var cursors;
var groundLayer, backgroundLayer;
var geschwindgkeit = 160;
var sprung = 250;
var counter = 0;
// Drei verschiedene Arten von Collectables, um verschiedene Effekte zu realisieren:
var itemLayerOne, itemLayerTwo, itemLayerThree;
var item_Hanf,item_HanfZwei,item_HanfDrei,item_Kokain, item_KokainZwei, item_Teile, item_TeileZwei, itemHanfOne, itemHanfTwo, itemHanfThree, itemKoksOne, itemKoksTwo, itemTeilOne, itemTeilTwo;
var music;
// Später noch Score einbauen??
var text;
var filter, filterStaerke = 0;
// Test ----
var tilesMario, tilesForrest, tilesCity_David, tilesCityTown;
// Initialisieren grundlegende Dinge, die im späteren Verlauf wichtig werden.
gameScene.init = function() {
    // Lege einen imaginären Key an:
    this.courserKey = null;
}
// Wir laden nun unsere Assets aus dem Ordner
gameScene.preload = function() {
    // Lade eine TileMap durch die, zuvor angelegte tilemapTiledJSON. 
    // Diese läd dann auch die PNG-Datei aus dem angegebenen Verzeichnis.
// Lade neue TileMap für Skyline Map:
    this.load.tilemapTiledJSON('Skyline', 'Assets/Worlds/SkyLine/World_Skyline.json');
// Lade Tiles des Supermario Sprite_sheets:
    this.load.spritesheet('SuperMario_Tiles', 'Assets/Tiles/Supermario_TileSet.png', {frameWidth : 16, frameHeight : 16});
// Lade Item Tiles:
    this.load.spritesheet('Item_Tiles', 'Assets/Items/Items_Sprite_sheet.png', {frameWidth : 25, frameHeight : 25});
    // lade Daten für den Spieler - Inklusive JASON File um Animation zu machen:
    this.load.spritesheet('Spieler_Normal', 'Assets/Player/Normal_Sheet/Sprite_sheet_new.png', {frameWidth : 27.8, frameHeight : 76});
//Lade Filter : 
    this.load.image('Filter', 'Assets/Worlds/Filter/Trip.png');
// Lade Musikdateien ins Spiel:
    this.load.audio('MenueSound', 'Assets/Music/Main_Menu.mp3');
    this.load.audio('HouseOfRaisingSun', 'Assets/Music/House_of_raising_sun.mp3');
    this.load.audio('Halelluja', 'Assets/Music/Halelleuja.mp3');
    this.load.audio('Country_Crack', 'Assets/Music/Country_Crack.mp3');
    this.load.audio('Jump', 'Assets/Music/Jump.mp3');
};
    // Wird einmal gerufen um geladenes zu laden
    gameScene.create = function() {
    // Erzeuge einzelnde Maps:
    map01 = this.make.tilemap( { key : 'Skyline' } );
    // Übergebe Tileset einer Map, an tiles-Variable:
    tilesMario = map01.addTilesetImage('Supermario_TileSet', 'SuperMario_Tiles');
// -------------- Layer-Konfiguration für map01 ---------------
    // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
    // Erst der Hintergrund:
    backgroundLayer = map01.createStaticLayer('Background', tilesMario, 0, 0);
    // Danach die Plattformen:
    groundLayer = map01.createStaticLayer('Ground', tilesMario, 0, 0);
    filter = this.add.image(900, 900, 'Filter');
    filter.setAlpha(filterStaerke);
    //Weed
    item_Hanf = map01.findObject('Items', obj => obj.name === 'dope');
    item_HanfZwei = map01.findObject('Items', obj => obj.name == 'dope2');
    item_HanfDrei = map01.findObject('Items', obj => obj.name == 'dope3');
    //Kokain
    item_Kokain = map01.findObject('Items', obj => obj.name == 'koks');
    item_KokainZwei = map01.findObject('Items', obj => obj.name == 'koks2');
    //LSD
    item_Teile = map01.findObject('Items', obj => obj.name === 'teil');
    item_TeileZwei = map01.findObject('Items', obj => obj.name === 'teil2');
    //Weed
    itemHanfOne = this.physics.add.sprite(item_Hanf.x, item_Hanf.y, "Item_Tiles", 0);
    itemHanfTwo = this.physics.add.sprite(item_HanfZwei.x, item_HanfZwei.y, "Item_Tiles",0);
    itemHanfThree = this.physics.add.sprite(item_HanfDrei.x, item_HanfDrei.y, "Item_Tiles",0);
    //Kokain
    itemKoksOne = this.physics.add.sprite(item_Kokain.x, item_Kokain.y, "Item_Tiles", 1);
    itemKoksTwo = this.physics.add.sprite(item_KokainZwei.x, item_KokainZwei.y, "Item_Tiles", 1);
    //LSD
    itemTeilOne = this.physics.add.sprite(item_Teile.x, item_Teile.y, "Item_Tiles", 2);
    itemTeilTwo = this.physics.add.sprite(item_TeileZwei.x, item_TeileZwei.y, "Item_Tiles", 2);
    //Weed
    itemHanfOne.setCollideWorldBounds(true);
    itemHanfTwo.setCollideWorldBounds(true);
    itemHanfThree.setCollideWorldBounds(true);
    //Kokain
    itemKoksOne.setCollideWorldBounds(true);
    itemKoksTwo.setCollideWorldBounds(true);
    //LSD
    itemTeilOne.setCollideWorldBounds(true);
    itemTeilTwo.setCollideWorldBounds(true);
// Funtktion effekt Item:
    //Weed
    this.physics.add.collider(itemHanfOne, groundLayer);
    this.physics.add.collider(itemHanfTwo, groundLayer);
    this.physics.add.collider(itemHanfThree, groundLayer);
    //Kokain
    this.physics.add.collider(itemKoksOne, groundLayer);
    this.physics.add.collider(itemKoksTwo, groundLayer);
    //LSD    
    this.physics.add.collider(itemTeilOne, groundLayer);
    this.physics.add.collider(itemTeilTwo, groundLayer);
    // Mit welchem Layer <hier groundLayer> Soll der Player Kollidieren
    groundLayer.setCollisionByExclusion( [-1] );
   // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
   this.physics.world.bounds.width = groundLayer.width;
   this.physics.world.bounds.height = groundLayer.height;
// -------------- Layer-Konfiguration für map01 ---------------
// Erzeuge Spieler für unser Spiel:
    player = this.physics.add.sprite(50, 900, 'Spieler_Normal');
    player.setBounce( 0.2 ) //Player will bounce from items
    player.setCollideWorldBounds(true); // Damit der Spieler nicht außerhalb der Map gehen kann.
    // Eine Animation erzeugen: ** Geht das auch effizienter? **
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 0, end : 1}),
        frameRate : 10,
        repeat : -1
    });
    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 3, end : 4}),
        frameRate : 10,
        repeat : -1
    });
    this.anims.create({
        key : 'stay',
        frames : [{ key : 'Spieler_Normal', frame : 2}],
        frameRate : 20, // ** Warum wird ein einzelnes Frame öffter geupdatet als zwei hintereinander??? **
    });
// Gib an, dass der SPieler mit dem Grund Kollidieren kann:
    this.physics.add.collider(groundLayer, player);
    // Kamera Einstellungen
    camera = this.cameras.main.startFollow(player, true, 0.4, 0.4);
    camera.setBackgroundColor('#FF00FF');
    this.cameras.main.setBounds(0, 0, 2721, 925);
    // Hintergrundfarbe der Kamera
    this.cameras.main.setBackgroundColor('#FF00FF');
    //Weed
    this.physics.add.overlap(player, itemHanfOne, item_Effekte, null, this);
    this.physics.add.overlap(player, itemHanfTwo, item_Effekte, null, this);
    this.physics.add.overlap(player, itemHanfThree, item_Effekte, null, this);
    //Kokain
    this.physics.add.overlap(player, itemKoksOne, item_EffekteTwo, null, this);
    this.physics.add.overlap(player, itemKoksTwo, item_EffekteTwo, null, this);
    //LSD    
    this.physics.add.overlap(player, itemTeilOne, item_EffekteThree, null, this);
    this.physics.add.overlap(player, itemTeilTwo, item_EffekteThree, null, this);
// Die im initial() angelegte Variable, wird nun zugewiesen:
    courserKey = this.input.keyboard.createCursorKeys();
    // ** courserKey muss in initial() zuvor angelegt werden! **
    // Array um Musikdateien nach und nach abzuspielen
        music = new Array(5);
// Füge Musikdateien in das Array:
        music[0] = this.sound.add('MenueSound');
        music[1] = this.sound.add('HouseOfRaisingSun');
        music[2] = this.sound.add('Halelluja');
        music[3] = this.sound.add('Jump');
// Mache Musik loop draus:
        music[1].setLoop(true);
// Musik wird abgespielt:
        music[1].play();
}
// Nun lassen wir die Berechnungen immer wieder passieren, baer was soll berechnet werden?
//  -> Diese Methode wird jedes Frame aufs neue aufgerufen. Also 60x pro Sekunde.
gameScene.update = function () {
// In der Update-Abfrage nach Position des Spieler Fragen -> Je nach Level wir ander Musik gespielt.
//Wir prüfen auf Aktivität:
  if ( courserKey.left.isDown ) { // Laufe nach links
       player.body.setVelocityX(- geschwindgkeit);
       player.anims.play('left', true);
   } 
   else if ( courserKey.right.isDown ) { // Laufe nach rechts
       player.body.setVelocityX(geschwindgkeit);
       player.anims.play('right', true);
   }
   else {
        player.body.setVelocityX(0);
        player.anims.play('stay', true);
    }
    if ( (courserKey.space.isDown || courserKey.up.isDown) && player.body.onFloor() ) {
        // Springe bei Leertaste | Pfeil nach oben
       player.body.setVelocityY(- sprung);
       player.anims.play('stay', true);
        music[3].play(); 
    }
    //Neue Welt wird erzeugt
    if(player.x >= 2220 && player.x <= 2270 && player.y == 266 ){
        this.scene.start(gameSceneTwo);
        music[1].stop();
    }
}
// Funtktion effekt Item:
//Weed
function item_Effekte(player, itemE) {
    itemE.disableBody(true,true);
    geschwindgkeit = 80;
    sprung = 300;
    counter++;
    checkGame();
    setTimeout(doItemsStop, 18000 );
}
//Koks
function item_EffekteTwo(player, itemE) {
    itemE.disableBody(true,true);
    geschwindgkeit = 420;
    sprung = 300;
    counter++;
    checkGame();
    setTimeout(doItemsStop, 18000 );
}
//LSD
function item_EffekteThree(player, itemE) {
    itemE.disableBody(true,true);
    geschwindgkeit = 80;
    sprung = 200;
    counter++;
    checkGame();
    filter.setAlpha(0.8);
    setTimeout(doItemsStop, 18000);
    setTimeout(doFilterStop, 18000);
}
// Check für Mischkonsum
function checkGame(){
    if(counter == 4){
        location.href = "GameOver.html";
    }
}
function getPlayerPos() {
    console.log("X - Achse: " + player.x + " - " + "Y - Achse: " + player.y );
}
function doFilterStop(){
    filter.setAlpha(0.4);
    setTimeout(beClean, 9000 );
}
function doItemsStop(){
    geschwindgkeit = 50;
    sprung = 100;
    setTimeout(beClean, 9000 ); 
}
function beClean(){
    geschwindgkeit = 160;
    sprung = 250;
    filter.setAlpha(0);
}
//------------------------------------------------------------------------------------------------------------------------
gameSceneTwo.init = function() {
    // Lege einen imaginären Key an:
    this.courserKey = null;
}
// Wir laden nun unsere Assets aus dem Ordner
gameSceneTwo.preload = function() {
    // Lade eine TileMap durch die, zuvor angelegte tilemapTiledJSON. 
    // Diese läd dann auch die PNG-Datei aus dem angegebenen Verzeichnis.
// Lade neue TileMap für Skyline Map:
    this.load.tilemapTiledJSON('Skyline', 'Assets/Worlds/SkyLine/World_Skyline.json');
// Lade neue TileMap für Forrest Map:
    this.load.tilemapTiledJSON('Forrest', 'Assets/Worlds/Forrest/World_Forrest.json');
// Lade Tiles des Supermario Sprite_sheets:
    this.load.spritesheet('SuperMario_Tiles', 'Assets/Tiles/Supermario_TileSet.png', {frameWidth : 16, frameHeight : 16});
// Lade Tiles aus Forrest_panorama JPG-Datei:
    this.load.spritesheet('Forrest_Tiles', 'Assets/Tiles/Forrest_panorama.jpg', {frameWidth : 16, frameHeight : 16});
// Lade Item Tiles:
    this.load.spritesheet('Item_Tiles', 'Assets/Items/Items_Sprite_sheet.png', {frameWidth : 25, frameHeight : 25});
// lade Daten für den Spieler - Inklusive JASON File um Animation zu machen:
    this.load.spritesheet('Spieler_Normal', 'Assets/Player/Normal_Sheet/Sprite_sheet_new.png', {frameWidth : 25, frameHeight : 78});
// Lade Musikdateien ins Spiel:
    this.load.audio('MenueSound', 'Assets/Music/Main_Menu.mp3');
    this.load.audio('HouseOfRaisingSun', 'Assets/Music/House_of_raising_sun.mp3');
    this.load.audio('Halelluja', 'Assets/Music/Halelleuja.mp3');
    this.load.audio('Country_Crack', 'Assets/Music/Country_Crack.mp3');
};
// Wird einmal gerufen um geladenes zu laden
    gameSceneTwo.create = function() {
// Erzeuge einzelne Maps:
    map02 = this.make.tilemap( { key : 'Forrest' } );
// Übergebe Tileset einer Map, an tiles-Variable:
    tilesMario = map02.addTilesetImage('Supermario_TileSet', 'SuperMario_Tiles');
// Übergebe Tileset einer Map, an tiles-Variable:
     tilesForrest = map02.addTilesetImage('Forrest_Tileset', 'Forrest_Tiles');
// -------------- Layer-Konfiguration für map02 ---------------
    // Um die Layer übereinander sehen zu können müssen diese von hinten nach vorne gecoded werden:
// Erst der Hintergrund:
    backgroundLayer = map02.createStaticLayer('Background', tilesForrest, 0, 0);
// Danach die Plattformen:
    groundLayer = map02.createStaticLayer('Ground', tilesMario, 0, 0);
// Items im Spiel:
    //items = map02.createObjectLayer('Hanf', tilesMario, 0, 0);
    item_Hanf = map02.findObject( 'Item_Hanf', obj => obj.name === 'Hanf_2' );
    items = this.physics.add.sprite(item_Hanf.x, item_Hanf.y, "Item_Tiles", 0);
    // Setzten wir Limits, damit der Spieler nicht über die Ränder hinaus laufen kann
    this.physics.world.bounds.width = groundLayer.width;
    this.physics.world.bounds.height = groundLayer.height;
    // -------------- Layer-Konfiguration für map02 ---------------
// Erzeuge Spieler für unser Spiel:
    player = this.physics.add.sprite(500, 500, 'Spieler_Normal');
    player.setBounce( 0.2 ) //Player will bounce from items
    player.setCollideWorldBounds(true); // Damit der Spieler nicht außerhalb der Map gehen kann.
    // Eine Animation erzeugen: ** Geht das auch effizienter? **
    this.anims.create({
        key : 'left',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 0, end : 1}),
        frameRate : 10,
        repeat : -1
    });
    this.anims.create({
        key : 'right',
        frames : this.anims.generateFrameNumbers('Spieler_Normal', { start : 3, end : 4}),
        frameRate : 10,
        repeat : -1
    });
    this.anims.create({
        key : 'stay',
        frames : [{ key : 'Spieler_Normal', frame : 2}],
        frameRate : 20, // ** Warum wird ein einzelnes Frame öffter geupdatet als zwei hintereinander??? **
    });
   // Gib an, dass der SPieler mit dem Grund Kollidieren kann:
   this.physics.add.collider(groundLayer, player);
    // Kamera Einstellungen
    camera = this.cameras.main.startFollow(player, true, 0.4, 0.4);
    camera.setBackgroundColor('#FF00FF');
   this.cameras.main.setBounds(0, 0, 2721, 925);
    // Hintergrundfarbe der Kamera
   this.cameras.main.setBackgroundColor('#FF00FF');
    // Die im initial() angelegte Variable, wird nun zugewiesen:
    courserKey = this.input.keyboard.createCursorKeys();
    // Array um Musikdateien nach und nach abzuspielen
    music = new Array(5);
//Füge Musikdateien in das Array:
    music[0] = this.sound.add('MenueSound');
    music[1] = this.sound.add('HouseOfRaisingSun');
    music[2] = this.sound.add('Halelluja');
// Mache Musik loop draus:
     music[2].setLoop(true);
// Musik wird abgespielt:
    music[2].play();
}
// Nun lassen wir die Berechnungen immer wieder passieren, baer was soll berechnet werden?
//  -> Diese Methode wird jedes Frame aufs neue aufgerufen. Also 60x pro Sekunde.
gameSceneTwo.update = function () {
//Wir prüfen auf Aktivität:
  if ( courserKey.left.isDown ) { // Laufe nach links
       player.body.setVelocityX(-80);
       player.anims.play('left', true);
   } 
   else if ( courserKey.right.isDown ) { // Laufe nach rechts
       player.body.setVelocityX(80);
       player.anims.play('right', true);
   }
   else {
        player.body.setVelocityX(0);
        player.anims.play('stay', true);
    }
    if ( (courserKey.space.isDown || courserKey.up.isDown) && player.body.onFloor() ) {
        // Springe bei Leertaste | Pfeil nach oben
       player.body.setVelocityY(-400);
       player.anims.play('stay', true);
    }
}

console.log("*** Einfach den Collider auf der Grünen Wiese legen wie Tim Wiese ***");