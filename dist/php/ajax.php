<?
// Connect DB
try {
  $db = new PDO("sqlite:../electron.sqlite");
}
catch(PDOException $e) {
    echo $e->getMessage();
}

// Actions for comments
if(isset($_POST['action'])) {
  $action = $_POST['action'];
  switch ($action) {
    case 'addComment':
        $date = new DateTime();
        $data = array( 'name' => $_POST['name'], 'message' => $_POST['message'], 'avatar' => $_POST['avatar'], 'created_at' => $date->getTimestamp() );
        $query = $db->prepare('INSERT INTO comments(name, message, avatar, created_at) VALUES(:name, :message, :avatar, :created_at)');
        $query->execute($data);
        break;
    case 'deleteComment':
        $commentId = $_POST['comment'];
        $db->exec('delete from comments WHERE id="' . $commentId . '"');
        break;
    }
}

// Get Comments
$results = $db->query('SELECT * FROM comments');
$results->setFetchMode(PDO::FETCH_ASSOC);
$comments = '';
foreach($results->fetchAll() as $res) {
  $comments .= '<div class="comment box">
            <header class="comment-head">
              <div class="comment-avatar"><img src="' . $res['avatar'] . '" alt="comment author"></div>
              <div class="comment-author">
                <h3 class="comment-author-name">' . $res['name'] . '</h3>
                <div class="comment-time">вчера в ' . date('h:i', $res['created_at']) . '</div>
              </div>
            </header>
            <div class="comment-content">' . $res['message'] . '</div>
            <div class="comment-delete" data-id="' . $res['id'] . '" onclick="deleteComment(' . $res['id'] . ')"><img src="img/svg/delete.svg"></div>
          </div>';
}
echo $comments;
