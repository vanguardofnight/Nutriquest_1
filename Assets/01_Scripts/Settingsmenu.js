private var originalWidth : float = 800.0f;
private var originalHeight : float = 480.0f;

public var clickSound : AudioClip;

private var titleStyle : GUIStyle = new GUIStyle();
private var menuStyle : GUIStyle = new GUIStyle();
private var logStyle : GUIStyle = new GUIStyle();

private var yellowButton : Texture;
private var blueButton : Texture;

private var bioHarness : GameObject;
private var control : BioHarnessController;

function Start () {
	bioHarness = GameObject.Find("BioHarness");
	control = bioHarness.GetComponent(typeof(BioHarnessController));
	
	titleStyle.font = Resources.Load("Fonts/kenvector_future", Font);
	titleStyle.fontSize = 25;
	titleStyle.normal.textColor = Color (0, 0, 0, 1.0f);

	menuStyle.font = Resources.Load("Fonts/kenvector_future", Font);
	menuStyle.fontSize = 18;
	menuStyle.normal.textColor = Color (1, 1, 1, 1.0f);
	menuStyle.alignment = TextAnchor.MiddleCenter;
	
	logStyle.font = Resources.Load("Fonts/kenvector_future", Font);
	logStyle.fontSize = 8;
	logStyle.normal.textColor = Color (0.5f, 0.5f, 0.5f, 1.0f);
	logStyle.alignment = TextAnchor.UpperLeft;

	yellowButton = Resources.Load("UI/yellow_button00", Texture);
	blueButton = Resources.Load("UI/blue_button00", Texture);
}

function OnGUI() {
	// Set matrix
	var ratio : Vector2 = Vector2(Screen.width/originalWidth , Screen.height/originalHeight );
	var guiMatrix : Matrix4x4 = Matrix4x4.identity;
	guiMatrix.SetTRS(Vector3(1, 1, 1), Quaternion.identity, Vector3(ratio.x, ratio.y, 1));
	GUI.matrix = guiMatrix;
	
	// GUI here
	GUI.Label ( Rect (80.0f, 60.0f, 260.0f, 30.0f), "BioHarness Setting", titleStyle );
	
	GUI.DrawTexture( Rect (80.0f, 115.0f, 180.0f, 55.0f), yellowButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (80.0f, 115.0f, 180.0f, 55.0f), "Connect", menuStyle)) {
		select(1);
	}
	GUI.Label(Rect(80, 175, 300, 120), "- System Log: " + control.GetLog(), logStyle);
	
	GUI.DrawTexture( Rect (300.0f, 115.0f, 190.0f, 55.0f), yellowButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (300.0f, 115.0f, 190.0f, 55.0f), "Disconnect", menuStyle)) {
		select(2);
	}
	
	GUI.Label ( Rect (80.0f, 260.0f, 260.0f, 30.0f), "General", titleStyle );
	GUI.DrawTexture( Rect (80.0f, 325.0f, 190.0f, 55.0f), blueButton, ScaleMode.StretchToFill, true, 0.0f);
	if (GUI.Button ( Rect (80.0f, 325.0f, 190.0f, 55.0f), "Main Menu", menuStyle)) {
		select(3);
	}
	
	// Reset matrix
	GUI.matrix = Matrix4x4.identity;
}

function select (type : int){
	if (type == 1) {
		audio.PlayOneShot(clickSound);
		control.connect();
	}
	
	if (type == 2) {
		audio.PlayOneShot(clickSound);
		control.disconnect();
	}
	
	if (type == 3) {
		audio.PlayOneShot(clickSound);
		yield WaitForSeconds (0.35);
		Application.LoadLevel("intro");
	}
}