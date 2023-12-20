// DownloadFile 是透過 HTML5 的 a 標籤來下載檔案
export function DownloadFile(file: string, url: string): void {
    const a = document.createElement('a');
    // 隱藏 a 標籤
    a.style.display = 'none';
    a.href = url;
    a.download = file;
    // 觸發點擊事件來下載
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}
