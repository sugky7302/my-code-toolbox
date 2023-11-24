// downloadToTxt 會把 content 下載成 .txt。
// content 替換成你要下載的內容，fileName 替換成你要下載的檔名。
function downloadToTxt() {
    const content = "Hello, world!";
    const fileName = "hello.txt";

    const blob = new Blob([content], { type: "text/plain" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
}