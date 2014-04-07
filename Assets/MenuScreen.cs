using UnityEngine;
using System.Collections;

public class MenuScreen : MonoBehaviour
{
		
		// Use this for initialization
	public Vector4 menuDim  = new Vector4(5, 
	                                      5,
	                                      200,
	                                      600); 
	public Vector2 buttonSize = new Vector2 (150, 25);

	public GUIStyle style;
		void Start ()
		{
		Screen.orientation = ScreenOrientation.AutoRotation;
		OnGUI ();
		}
	void OnGUI(){
				
			GUI.Box (new Rect (menuDim.x, menuDim.y, menuDim.z, menuDim.w), 
			      "NutriQuest");
			//Begin from first level
			if (GUI.Button(new Rect (menuDim.x + 15, menuDim.y + 30, buttonSize.x, buttonSize.y), "Begin Game")) {
				Application.LoadLevel("lvl1");
			}
			// Level Select Screeen 		
			if (GUI.Button(new Rect (menuDim.x + 15, menuDim.y + 50, buttonSize.x, buttonSize.y), "Connect BioHarness")) {
				Application.LoadLevel("Levels");
			}
			//
		}
		// Update is called once per frame
		void Update ()
		{
			
		}
}

