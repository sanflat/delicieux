/**
 * 新しいタスクを追加する非同期関数（スタブ）
 * @param {string} text タスクの内容
 * @param {string[]} userIds タスクに関連するユーザーIDのリスト
 * @param {boolean} done タスクの完了状態
 * @returns {Promise<string>} タスクIDを返します
 */
export const addTodo = async (text: string, userIds: string[], done: boolean): Promise<string> => {
  console.log('タスクを追加しました（スタブ）:', text);
  // デモ用にランダムなIDを返すs
  const taskId = `todo_${Math.random().toString(36).substring(2, 15)}`;
  return taskId;
};

export const updateTodoShare = async (currentUserId: string, shareItemIds: string[], selectedUserIds: string[]) => {
  console.log('タスクのシェア情報を更新しました（スタブ）:', shareItemIds, '共有ユーザー:', selectedUserIds);
};

export const resetTodoShare = async (currentUserId: string, shareItemIds: string[]) => {
  console.log('タスクのシェア情報をリセットしました（スタブ）:', shareItemIds);
};

export const updateTodoText = async (text: string, id: string) => {
  console.log('タスクのテキストを更新しました（スタブ）:', id, '新しいテキスト:', text);
};

export const updateTodoDone = async (done: boolean, id: string) => {
  console.log('タスクの完了状態を更新しました（スタブ）:', id, '完了状態:', done);
};

export const deleteTodo = async (id: string) => {
  console.log('タスクを削除しました（スタブ）:', id);
};

/**
 * 指定したユーザーのタスクデータをリアルタイムに取得し、変更があるたびにコールバックを実行します。（スタブ）
 * @param userId 取得するタスクのユーザーID
 * @param callback タスクデータが更新されたときに実行されるコールバック関数
 * @returns 購読解除関数
 */
export function subscribeToTasks(userId: string, callback: (todos: Array<any>) => void) {
  console.log('タスクデータを購読しました（スタブ）:', userId);
  const stubTodos = [
    { id: 'todo1', text: 'Email client about project updates', done: true, userIds: [userId, "Jon", "Mic"] },
    { id: 'todo2', text: 'Prepare project presentation slides', done: false, userIds: [userId, "Hey", "San"] },
    { id: 'todo3', text: 'Review the latest deployment logs', done: false, userIds: [userId] },
    { id: 'todo4', text: 'Update project documentation', done: true, userIds: [userId] },
    { id: 'todo5', text: 'Meet with the design team', done: false, userIds: [userId] },
    { id: 'todo6', text: 'Refactor the authentication module', done: false, userIds: [userId] },
    { id: 'todo7', text: 'Run performance tests on the new module', done: true, userIds: [userId] },
    { id: 'todo8', text: 'Fix bugs reported by the QA team', done: false, userIds: [userId] },
    { id: 'todo9', text: 'Write unit tests for the user service', done: false, userIds: [userId] },
    { id: 'todo10', text: 'Optimize database queries', done: true, userIds: [userId] },
    { id: 'todo11', text: 'Check email for customer feedback', done: false, userIds: [userId] },
    { id: 'todo12', text: 'Schedule a team meeting for next week', done: true, userIds: [userId] },
    { id: 'todo13', text: 'Update dependencies in the backend project', done: false, userIds: [userId] },
    { id: 'todo14', text: 'Review and merge pull requests', done: false, userIds: [userId] },
    { id: 'todo15', text: 'Draft a blog post for the company website', done: false, userIds: [userId] },
    { id: 'todo16', text: 'Prepare a budget report for the finance department', done: true, userIds: [userId] },
    { id: 'todo17', text: 'Attend workshop on cybersecurity', done: false, userIds: [userId] },
    { id: 'todo18', text: 'Conduct a code review session', done: false, userIds: [userId] },
    { id: 'todo19', text: 'Plan the office holiday party', done: false, userIds: [userId] },
    { id: 'todo20', text: 'Complete employee performance evaluations', done: true, userIds: [userId] }
  ];
  
  // ここで模擬データを即時コールバックに送信する
  callback(stubTodos);

  // 購読解除関数を返す
  return () => console.log('タスクデータの購読を解除しました');
}