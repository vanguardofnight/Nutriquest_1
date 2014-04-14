static var PlayerScore : int;

var ScoreTextPosition : Rect = Rect(0, 0, 256, 128);
var style : GUIStyle;

function Start()
{
	PlayerScore = 0;
	style.normal.textColor = Color.white;
}
 
function OnTriggerEnter(other : Collider)
{
	Debug.Log(other.gameObject.tag);
	if(other.gameObject.tag == "Fruit"){
		PlayerScore += 1;
	} else if (other.gameObject.tag == "Grain"){
		PlayerScore += 1;
	} else if (other.gameObject.tag == "Dairy"){
		PlayerScore += 1;
	} else if (other.gameObject.tag == "JunkFood"){
		PlayerScore -= 1;
	}
}
 
function Update()
{
}
 
function OnGUI()
{
	GUI.Label(ScoreTextPosition, "Score: " + PlayerScore, style);
}