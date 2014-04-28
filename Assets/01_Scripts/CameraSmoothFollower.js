// TODO: 7-2 zoom/zoom out based on bioharness values
var cameraTarget 		: GameObject;

var smoothTime			: float = 0.1;
var velocity			: Vector2;

var leftBorder			: float;
var rightBorder			: float;
var topBorder			: float;
var bottomBorder		: float;

private var thisTransform : Transform;

function Start () {
	thisTransform = transform;
}

function Update () {
	if ( cameraTarget.transform.position.x < leftBorder ) {
		thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, leftBorder, velocity.x, smoothTime);
	} else if ( cameraTarget.transform.position.x > rightBorder ) {
		thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, rightBorder, velocity.x, smoothTime);
	} else {
		thisTransform.position.x = Mathf.SmoothDamp( thisTransform.position.x, cameraTarget.transform.position.x, velocity.x, smoothTime);
	}

	if ( cameraTarget.transform.position.y < bottomBorder ) {
		thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, bottomBorder, velocity.y, smoothTime);
	} else if ( cameraTarget.transform.position.y > topBorder ) {
		thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, topBorder, velocity.y, smoothTime);
	} else {
		thisTransform.position.y = Mathf.SmoothDamp( thisTransform.position.y, cameraTarget.transform.position.y, velocity.y, smoothTime);
	}
}