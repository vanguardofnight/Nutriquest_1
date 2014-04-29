using UnityEngine;
using System.Collections;

public class Intro : MonoBehaviour {
	float originalWidth = 800;
	float originalHeight = 480;

	public AudioClip clickSound;

	GUIStyle titleStyle = new GUIStyle();
	GUIStyle menuStyle = new GUIStyle();
	Texture yellowButton;
	GUIText log;

	// Use this for initialization
	void Start () {
		Screen.orientation = ScreenOrientation.LandscapeLeft;

		titleStyle.font = (Font)Resources.Load("Fonts/kenvector_future");
		titleStyle.fontSize = 45;
		titleStyle.normal.textColor = new Color (0, 0.54f, 1.0f, 1.0f);

		menuStyle.font = (Font)Resources.Load("Fonts/kenvector_future");
		menuStyle.fontSize = 25;
		menuStyle.normal.textColor = new Color (0.78f, 0, 0, 1.0f);
		menuStyle.alignment = TextAnchor.MiddleCenter;

		yellowButton = Resources.Load("UI/yellow_button00") as Texture;

	}

	void OnGUI()
	{
		// Set matrix
		Vector2 ratio = new Vector2(Screen.width/originalWidth , Screen.height/originalHeight );
		Matrix4x4 guiMatrix = Matrix4x4.identity;
		guiMatrix.SetTRS(new Vector3(1, 1, 1), Quaternion.identity, new Vector3(ratio.x, ratio.y, 1));
		GUI.matrix = guiMatrix;
		
		// GUI here
		// Title 
		string strTitle = "NUTRIQUEST";
		GUI.Label ( new Rect (420.0f, 100.0f, 50.0f, 50.0f), strTitle, titleStyle );

		// Buttons
		GUIContent newGame = new GUIContent ();
		newGame.text = "New game";
		GUI.DrawTexture(new Rect (80.0f, 90.0f, 280.0f, 70.0f), yellowButton, ScaleMode.StretchToFill, true, 0.0f);
		if (GUI.Button (new Rect (80.0f, 90.0f, 280.0f, 70.0f), newGame, menuStyle)) {
//			control.connect();
		}

		GUIContent levelSelect = new GUIContent ();
		levelSelect.text = "Level Select";
		GUI.DrawTexture(new Rect (80.0f, 200.0f, 280.0f, 70.0f), yellowButton, ScaleMode.StretchToFill, true, 0.0f);
		if (GUI.Button (new Rect (80.0f, 200.0f, 280.0f, 70.0f), levelSelect, menuStyle)) {
			StartCoroutine(NextScene ("lvlselect"));
		}

		GUIContent options = new GUIContent ();
		options.text = "Options";
		GUI.DrawTexture(new Rect (80.0f, 310.0f, 280.0f, 70.0f), yellowButton, ScaleMode.StretchToFill, true, 0.0f);
		if (GUI.Button (new Rect (80.0f, 310.0f, 280.0f, 70.0f), options, menuStyle)) {
			StartCoroutine(NextScene ("settingsmenu"));
		}

		// Reset matrix
		GUI.matrix = Matrix4x4.identity;
	}

	IEnumerator NextScene(string scene) {
		audio.PlayOneShot(clickSound);
		yield return new WaitForSeconds(0.35f);
		Application.LoadLevel(scene);
	}
}
