/*
 * 這個檔案是用來計算 textarea 的高度。
 * @Reference:
 *   - https://juejin.cn/post/7120014348319195166?from=search-suggest
 */

// calculateNodeStyling 是解析 targetElement 的 CSS 設定，並回傳一個物件
function calculateNodeStyling(targetElement: Element) {
    const CONTEXT_STYLE = [
        "letter-spacing",
        "line-height",
        "padding-top",
        "padding-bottom",
        "font-family",
        "font-weight",
        "font-size",
        "text-rendering",
        "text-transform",
        "width",
        "text-indent",
        "padding-left",
        "padding-right",
        "border-width",
        "box-sizing",
    ];

    const style = window.getComputedStyle(targetElement);
    const boxSizing = style.getPropertyValue("box-sizing");
    const paddingSize =
        Number.parseFloat(style.getPropertyValue("padding-bottom")) +
        Number.parseFloat(style.getPropertyValue("padding-top"));
    const borderSize =
        Number.parseFloat(style.getPropertyValue("border-bottom-width")) +
        Number.parseFloat(style.getPropertyValue("border-top-width"));
    const contextStyle = CONTEXT_STYLE.map(
        (name) => `${name}:${style.getPropertyValue(name)}`
    ).join(";");
    return { contextStyle, paddingSize, borderSize, boxSizing };
}

export function calcTextareaHeight(targetElement: HTMLTextAreaElement, minRows = 1, maxRows = 0) {
    const isNumber = (v) => {
        // return /^[0-9]+$/.test(v)
        return typeof v === "number";
    };

    const HIDDEN_STYLE = `
    height:0 !important;
    visibility:hidden !important;
    overflow:hidden !important;
    position:absolute !important;
    z-index:-1000 !important;
    top:0 !important;
    right:0 !important;
  `;

    // 建立一個新的 textarea，並把它加到 body 裡面
    const hiddenTextarea = document.createElement("textarea");
    document.body.appendChild(hiddenTextarea);

    const { paddingSize, borderSize, boxSizing, contextStyle } =
        calculateNodeStyling(targetElement);

    // 把 hiddenTextarea 的 CSS 設定成跟 targetElement 一樣
    hiddenTextarea.setAttribute("style", `${contextStyle};${HIDDEN_STYLE}`);

    // 把 targetElement 的值複製到 hiddenTextarea 裡面
    hiddenTextarea.value = targetElement.value || targetElement.placeholder || "";
    hiddenTextarea.value += "我爱开源";

    // 取得 hiddenTextarea 的初始高度
    let height = hiddenTextarea.scrollHeight;
    const result: { minHeight: string; height: string; rows: number } = {
        minHeight: "",
        height: "",
        rows: 0,
    }; // as TextAreaHeight

    // 如果 box-sizing 是 border-box，就把 height 加上 borderSize
    if (boxSizing === "border-box") {
        height = height + borderSize;
        // 如果 box-sizing 是 content-box，就把 height 減去 paddingSize
    } else if (boxSizing === "content-box") {
        height = height - paddingSize;
    }

    // 清空 hiddenTextarea 的值，然後計算一行的高度
    //* 這邊的 hiddenTextarea.value = "我" 是因為中文字的高度跟英文字的高度不一樣，
    //* 使用英文字、空格或數字，會造成 Chrome 計算出來的高度少 2px，改成中文字就不會有這個問題。
    // Arvin Yang - 2023/12/01
    hiddenTextarea.value = "我";
    const singleRowHeight = hiddenTextarea.scrollHeight - paddingSize;

    if (isNumber(minRows)) {
        let minHeight = singleRowHeight * minRows;
        if (boxSizing === "border-box") {
            minHeight = minHeight + paddingSize + borderSize;
        }
        height = Math.max(minHeight, height);
        result.minHeight = `${minHeight}px`;
    }
    if (isNumber(maxRows) && maxRows >= 0) {
        let maxHeight = singleRowHeight * maxRows;
        if (boxSizing === "border-box") {
            maxHeight = maxHeight + paddingSize + borderSize;
        }
        height = Math.min(maxHeight, height);
    }
    result.height = `${height}px`;
    hiddenTextarea.parentNode?.removeChild(hiddenTextarea);

    // 計算 textarea 有幾行，因為相除會有小數點，所以要用 Math.ceil() 來無條件進位
    return { ...result, rows: Math.ceil(height / singleRowHeight) };
}
