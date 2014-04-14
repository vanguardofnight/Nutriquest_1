static var PlayerScore : int;
var ScoreText = "Score: 0";
var MaxPoints : int;
var ScoreTextPosition : Rect = Rect(0, 0, 256, 128);
var style : GUIStyle;

function Start()
{
	style.normal.textColor = Color.white;
}
 
function OnTriggerEnter(other : Collider)
{
	if(other.tag == "Point")
	{
		PlayerScore += 1;
		ScoreText = "Score: " + PlayerScore;
		Destroy(other.gameObject);
	}
	Debug.Log(other.gameObject.name);
}
 
function Update()
{
	GUI.Label(ScoreTextPosition, ScoreText, style);
}
 
function OnGUI()
{
	GUI.Label(ScoreTextPosition, ScoreText, style);
}