// This script is handling user properties & item pickup
private static var MAX_WATER: int = 15;
private var curLevel = "";

// GUIs
private var originalWidth : float = 800.0f;
private var originalHeight : float = 480.0f;
private var titleStyle : GUIStyle = new GUIStyle();
private var bgButton : Texture;

var strength 		: int = 1;
var weight 			: int = 1;
var gameover		: boolean = false;
var levelComplete	: boolean = false;

var water 			: int = MAX_WATER;
var fruit			: int = 0;
var grain			: int = 0;
var protein			: int = 0;
var junkfood		: int = 0;
var dairy			: int = 0;

private var flavor : FlavorScript;
var penalty : AudioSource;
var waterAudio : AudioSource;
var particle : GameObject;
var score 			: int = 0;

// Timer for water (2 seconds)
private var endTime : float;
private var waterTimer : float = 2.0;

// Timer for game play (1 second)
private var gameEndTimer : float;
private var maxGameTime : float;
private var gameTimeTxt : float;
private var oneSecTimer : float;

// BioHarness
private var bioHarness : GameObject;
private var bioControl : BioHarnessController;

function Start () {
	// BioHanress Setup
	bioHarness = GameObject.Find( "BioHarness" );
	bioControl = bioHarness.GetComponent( BioHarnessController );
	bioControl.InitRecord();
	
	flavor = GetComponent(FlavorScript);
	
	// Timer for water comsumption
	endTime = Time.time + waterTimer;
	 
	curLevel  = Application.loadedLevelName;

	maxGameTime = 60.0;
	gameTimeTxt = maxGameTime;
	if (curLevel == "lvl4") {
		gameEndTimer = Time.time + maxGameTime;
	}
	
	//GUIs
	titleStyle.font = Resources.Load("Fonts/kenvector_future", Font);
	titleStyle.fontSize = 25;
	titleStyle.normal.textColor = Color (0, 0, 0, 1.0f);
	titleStyle.alignment = TextAnchor.MiddleCenter;
	
	bgButton = Resources.Load("cloudy-sky-cartoon", Texture);
}

function Update () {
	if (curLevel == "lvl4") {
		if (gameEndTimer < Time.time) {
			levelComplete = true;
		}
		if ( oneSecTimer < Time.time) {
			gameTimeTxt--;
			oneSecTimer = Time.time + 1.0;
		}
	}
	
	// From respirationRate from BioHarness
	var respirationRate : float;
	
	// Hud bioharness updates
	var hudNum1 = GameObject.Find("HudNum1").GetComponent( ChangeNumber );
	var hudNum2 = GameObject.Find("HudNum2").GetComponent( ChangeNumber );
	var hudNum3 = GameObject.Find("HudNum3").GetComponent( ChangeNumber );
	
	if(bioControl.IsConnected()) {
	 	respirationRate = float.Parse(bioControl.GetRespirationRate());
		var tenth = Mathf.RoundToInt(respirationRate) / 10;
		var one = Mathf.RoundToInt(respirationRate - tenth * 10);
		var ffloat = Mathf.RoundToInt((respirationRate - tenth*10 - one) * 10)/10;
		hudNum1.ChangeNumber( tenth );
		hudNum2.ChangeNumber( one );
		hudNum3.ChangeNumber( ffloat );
 	} else {
 		// 10: hud_x sprite
 		hudNum1.ChangeNumber( 10 );
		hudNum2.ChangeNumber( 10 );
		hudNum3.ChangeNumber( 10 );
 	}
	 
	// Hud water updates
	var waterGauge = GameObject.Find("WaterLevel").GetComponent( WaterGauge );	
	waterGauge.Resize (water, MAX_WATER);
	
	// Water is decreased every 2 sec
	if ( endTime - Time.time < 0) {
		water -= 1;
		endTime = Time.time + waterTimer;
	}
	if(water <= 0){
		//Application.LoadLevel("gameover");
		gameover = true;
	}
	
	// HUD elements relating to weight, strength (dairy), and score
	var weightNum = GameObject.Find("WeightNum").GetComponent( ChangeNumber );
	var strengthNum = GameObject.Find("StrengthNum").GetComponent( ChangeNumber );
	var pointNum1 = GameObject.Find("PointNum1").GetComponent( ChangeNumber );
	var pointNum2 = GameObject.Find("PointNum2").GetComponent( ChangeNumber );
	var pointNum3 = GameObject.Find("PointNum3").GetComponent( ChangeNumber );
	
	score = (6*grain + 8*dairy + 4*protein - 2*junkfood + 3*fruit);
	
	if(bioControl.IsConnected()) {
	 	var avgBreathing = bioControl.GetAvg();
	 	score = score * (avgBreathing/6);
	}
	
	var score_hund = Mathf.RoundToInt(score)/100;
	var score_tenth = Mathf.RoundToInt(score - score_hund*100) / 10;
	var score_one = Mathf.RoundToInt(score - score_hund*100 - score_tenth*10);
	
	weightNum.ChangeNumber( weight );
	strengthNum.ChangeNumber( strength );
	pointNum1.ChangeNumber( score_hund );
	pointNum2.ChangeNumber( score_tenth );
	pointNum3.ChangeNumber( score_one );
}

function OnGUI(){
	// Set matrix
	var ratio : Vector2 = Vector2(Screen.width/originalWidth , Screen.height/originalHeight );
	var guiMatrix : Matrix4x4 = Matrix4x4.identity;
	guiMatrix.SetTRS(Vector3(1, 1, 1), Quaternion.identity, Vector3(ratio.x, ratio.y, 1));
	GUI.matrix = guiMatrix;
	
	
	// Do GUIs
	if (curLevel == "lvl4") {
		var txt = gameTimeTxt.ToString() + " seconds left";
		GUI.Label ( Rect(0, 30, 800, 100), txt, titleStyle);
	}

	if(gameover){
		GUI.DrawTexture( Rect (0, 0, originalWidth, originalHeight), bgButton, ScaleMode.StretchToFill, true, 0.0f);
		if(GUI.Button(Rect(0, 0, originalWidth, originalHeight), "Game Over", titleStyle)){
			Application.LoadLevel(Application.loadedLevel);
		}
	}
	
	if(levelComplete){
		GUI.DrawTexture( Rect (0, 0, originalWidth, originalHeight), bgButton, ScaleMode.StretchToFill, true, 0.0f);
		var levelcompleteText = " CONGRATULATIONS!! \nYour Score: " + score;
		if(GUI.Button(Rect(0, 0, originalWidth, originalHeight), levelcompleteText, titleStyle)){
			switch (curLevel) {
				case "lvl1":
					Application.LoadLevel("lvl2");
					break;
				case "lvl2":
					Application.LoadLevel("lvl3");
					break;
				case "lvl3":
					Application.LoadLevel("lvl4");
					break;
				case "lvl4":
					Application.LoadLevel("intro");
					break;
				default:
					Application.LoadLevel("intro"); 
			}
		}
	}
	
	// Reset matrix
	GUI.matrix = Matrix4x4.identity;
}

function OnTriggerEnter( other : Collider ) {
	var pc = GetComponent( PlayerControl );
	
	if(other.tag == "Lava"){
	  	gameover = true;
		// Destroy(gameObjecgamet.GetComponent(SpriteRenderer));
	}
	
	if(other.tag == "Finish"){
			levelComplete = true;
	}
		
		
	if(other.tag == "FallBlock"){
		var fallscript : fallingBlock = other.gameObject.GetComponent(fallingBlock);
		fallscript.switchOnGravity(weight);
	}
	
	if(other.tag == "Water") {
		water =  MAX_WATER;
		waterAudio.Play();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if(other.tag == "JunkFood") {
		weight += 1;
		junkfood += 1;
		flavor.Eat();
		flavor.ColorTransitionBad();
		penalty.Play(30000);
		Destroy(other.gameObject);
	}
	
	if(other.tag == "Dairy") {
		strength += 1;
		dairy += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Fruit") {
		fruit += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Grain") {
		pc.incSpeed();
		grain += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if( other.tag == "Protein") {
		pc.incJumpSpeed();
		protein += 1;
		flavor.Eat();
		flavor.ColorTransitionGood();
		Destroy(other.gameObject);
	}
	
	if(other.tag == "BreakBlock"){
		if(strength >= 3){
			Destroy(other.gameObject);
		}
	}
			
	if( other.tag == "Protein" || other.tag == "Fruit" || other.tag == "Grain" || other.tag == "Dairy" || other.tag == "JunkFood")
	{
		var cloneParticle : GameObject;
		cloneParticle = Instantiate(particle, transform.position, transform.rotation);
		cloneParticle.particleSystem.Emit(3);
		Destroy(cloneParticle,3);
	}	
}

