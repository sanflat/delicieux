import { useState, useEffect } from 'react';

/**
 * useDebounce フックは、値が頻繁に変更される場合の更新をデバウンス（間引き）します。
 * @param value デバウンスを適用する値
 * @param delay 遅延時間（ミリ秒）
 * @returns デバウンスされた値
 */
function useDebounce<T>(value: T, delay: number): T {
  // デバウンスされた値を保持するための状態
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // delay ミリ秒後に値を更新するタイマーを設定
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // コンポーネントがアンマウントされるか、値が更新された際にタイマーをクリア
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // 依存配列に value と delay を指定

  return debouncedValue;
}

export default useDebounce;
