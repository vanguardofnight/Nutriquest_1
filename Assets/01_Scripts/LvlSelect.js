private var originalWidth : float = 800.0f;
private var originalHeight : float = 480.0f;

public var clickSound : AudioClip;

private var titleStyle : GUIStyle = new GUIStyle();
private var menuStyle : GUIStyle = new GUIStyle();

private var yellowButton : Texture;
private var blueButton : Texture;
private var greenButton : Texture;
private var redButton : Texture;

function Start() 
{
	titleStyle.font = Resources.Load("Fonts/kenvector_future", Font);
	titleStyle.fontSize = 25;
	titleStyle.normal.textColor = Color (0, 0, 0, 1.0f);

	menuStyle.font = Resources.Load("Fonts/kenvector_future", Font);
	menuStyle.fontSize = 18;
	menuStyle.normal.textColor = Color (1, 1, 1, 1.0f);
	menuStyle.alignment = TextAnchor.MiddleCenter;
	
	yellowButton = Resources.Load("UI/yellow_button00", Texture);
	blueButton = Resources.Load("UI/blue_button00", Texture);
	greenButton = Resources.Load("UI/green_button00", Texture);
	redButton = Resources.Load("UI/red_button11", Texture);
}
function OnGUI() {
	// Set matrix
	var ratio : Vector2 = Vector2(Screen.width/originalWidth , Screen.height/originalHeight );
	var guiMatrix : Matrix4x4 = Matrix4x4.identity;
	guiMatrix.SetTRS(Vector3(1, 1, 1), Quaternion.identity, Vector3(ratio.x, ratio.y, 1));
	GUI.matrix = guiMatrix;
	
	// GUI here
	GUI.Label ( Rect (80.0f, 60.0f, 260.0f, 30.0f), "Level Selection", titleStyle );
	
	GUI.DrawTexture( Rect (80.0f, 115.0f, 180.0f, 55.0f), yellowButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (80.0f, 115.0f, 180.0f, 55.0f), "Level 1", menuStyle)) {
		select("lvl1");
	}

	GUI.DrawTexture( Rect (80.0f, 190.0f, 180.0f, 55.0f), blueButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (80.0f, 190.0f, 180.0f, 55.0f), "Level 2", menuStyle)) {
		select("lvl2");
	}
	GUI.DrawTexture( Rect (80.0f, 265.0f, 180.0f, 55.0f), greenButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (80.0f, 265.0f, 180.0f, 55.0f), "Level 3", menuStyle)) {
		select("lvl3");
	}
	GUI.DrawTexture( Rect (80.0f, 340.0f, 180.0f, 55.0f), redButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (80.0f, 340.0f, 180.0f, 55.0f), "Level 4", menuStyle)) {
		select("lvl4");
	}	
	
	GUI.DrawTexture( Rect (400.0f, 190.0f, 180.0f, 55.0f), blueButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (400.0f, 190.0f, 180.0f, 55.0f), "Main Menu", menuStyle)) {
		select("intro");
	}
	
	// Reset matrix
	GUI.matrix = Matrix4x4.identity;
}

function select (scene : String){
	audio.PlayOneShot(clickSound);
	yield WaitForSeconds (0.35);
	Application.LoadLevel(scene);
}