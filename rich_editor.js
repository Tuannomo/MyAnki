
var RE = {
    shouldInsertPlaceholder: false,
    startHighLightPos: -1
};

RE.currentSelection = {
    "startContainer": 0,
    "startOffset": 0,
    "endContainer": 0,
    "endOffset": 0
};

RE.editor = document.getElementById('editor');

document.addEventListener("selectionchange", function () { RE.backuprange(); });

// Initializations
RE.callback = function () {
    try {
        var url = "Tuna re-callback://" + encodeURIComponent(RE.getHtml());
        console.log('Callback URL:', url); // Log the URL to verify it's correct
    } catch (error) {
        console.error('Error in callback:', error);
    }
}

RE.setHtml = function (contents) {
    RE.editor.innerHTML = decodeURIComponent(contents.replace(/\+/g, '%20'));
}

RE.getHtml = function () {
    return RE.editor.innerHTML;
}

RE.getText = function () {
    return RE.editor.innerText;
}

RE.setBaseTextColor = function (color) {
    RE.editor.style.color = color;
}

RE.setBaseFontSize = function (size) {
    RE.editor.style.fontSize = size;
}

RE.setPadding = function (left, top, right, bottom) {
    RE.editor.style.paddingLeft = left;
    RE.editor.style.paddingTop = top;
    RE.editor.style.paddingRight = right;
    RE.editor.style.paddingBottom = bottom;
}

RE.setBackgroundColor = function (color) {
    document.body.style.backgroundColor = color;
}

RE.setBackgroundImage = function (image) {
    RE.editor.style.backgroundImage = image;
}

RE.setWidth = function (size) {
    RE.editor.style.minWidth = size;
}

RE.setHeight = function (size) {
    RE.editor.style.height = size;
}

RE.setTextAlign = function (align) {
    RE.editor.style.textAlign = align;
}

RE.setVerticalAlign = function (align) {
    RE.editor.style.verticalAlign = align;
}

RE.setPlaceholder = function (placeholder) {
    RE.editor.setAttribute("placeholder", placeholder);
}

RE.setInputEnabled = function (inputEnabled) {
    RE.editor.contentEditable = String(inputEnabled);
}

RE.undo = function () {
    document.execCommand('undo', false, null);
}

RE.redo = function () {
    document.execCommand('redo', false, null);
}

RE.setBold = function () {
    document.execCommand('bold', false, null);
}

RE.setItalic = function () {
    document.execCommand('italic', false, null);
}

RE.setSubscript = function () {
    document.execCommand('subscript', false, null);
}

RE.setSuperscript = function () {
    document.execCommand('superscript', false, null);
}

RE.setStrikeThrough = function () {
    document.execCommand('strikeThrough', false, null);
}

RE.setUnderline = function () {
    document.execCommand('underline', false, null);
}

RE.setBullets = function () {
    document.execCommand('insertUnorderedList', false, null);
}

RE.setNumbers = function () {
    document.execCommand('insertOrderedList', false, null);
}

RE.setTextColor = function (color) {
    RE.restorerange();
    document.execCommand("styleWithCSS", null, true);
    document.execCommand('foreColor', false, color);
    document.execCommand("styleWithCSS", null, false);
}

RE.setTextBackgroundColor = function (color) {
    RE.restorerange();
    document.execCommand("styleWithCSS", null, true);
    document.execCommand('hiliteColor', false, color);
    document.execCommand("styleWithCSS", null, false);
}

RE.setFontSize = function (fontSize) {
    document.execCommand("fontSize", false, fontSize);
}

RE.setHeading = function (heading) {
    document.execCommand('formatBlock', false, '<h' + heading + '>');
}

RE.setIndent = function () {
    document.execCommand('indent', false, null);
}

RE.setOutdent = function () {
    document.execCommand('outdent', false, null);
}

RE.setJustifyLeft = function () {
    document.execCommand('justifyLeft', false, null);
    // Get the current selection
}

RE.setJustifyCenter = function () {
    document.execCommand('justifyCenter', false, null);
}

RE.setJustifyRight = function () {
    document.execCommand('justifyRight', false, null);
}

RE.setBlockquote = function () {
    var sel = window.getSelection();
    if (sel.toString() != "")
        var html = '<p style="color: #000 !important;background-color: #f1f1f1 !important;border-left: 6px solid #ccc !important;padding:10px">' + window.getSelection().toString() + '</p></br>';
    document.execCommand('formatBlock', false, html);
}

RE.insertImage = function (url, alt) {
    var html = '<img src="' + url + '" alt="' + alt + '" />';
    RE.insertHTML(html);
}

RE.insertImageW = function (url, alt, width) {
    var html = '<img src="' + url + '" alt="' + alt + '" width="' + width + '"/>';
    RE.insertHTML(html);
}

RE.insertImageWH = function (url, alt, width, height) {
    var html = '<img src="' + url + '" alt="' + alt + '" width="' + width + '" height="' + height + '"/>';
    RE.insertHTML(html);
}

RE.insertVideo = function (url, alt) {
    var html = '<video src="' + url + '" controls></video><br>';
    RE.insertHTML(html);
}

RE.insertVideoW = function (url, width) {
    var html = '<video src="' + url + '" width="' + width + '" controls></video><br>';
    RE.insertHTML(html);
}

RE.insertVideoWH = function (url, width, height) {
    var html = '<video src="' + url + '" width="' + width + '" height="' + height + '" controls></video><br>';
    RE.insertHTML(html);
}

RE.insertAudio = function (url, alt) {
    var html = '<audio src="' + url + '" controls></audio><br>';
    RE.insertHTML(html);
}

RE.insertYoutubeVideo = function (url) {
    var html = '<iframe width="100%" height="100%" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>'
    RE.insertHTML(html);
}

RE.insertYoutubeVideoW = function (url, width) {
    var html = '<iframe width="' + width + '" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>'
    RE.insertHTML(html);
}

RE.insertYoutubeVideoWH = function (url, width, height) {
    var html = '<iframe width="' + width + '" height="' + height + '" src="' + url + '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe><br>'
    RE.insertHTML(html);
}

RE.insertHTML = function (html) {
    RE.restorerange();
    document.execCommand('insertHTML', false, html);
}

RE.insertLink = function (url, title) {
    RE.restorerange();
    var sel = document.getSelection();
    if (sel.toString().length == 0) {
        document.execCommand("insertHTML", false, "<a href='" + url + "'>" + title + "</a>");
    } else if (sel.rangeCount) {
        var el = document.createElement("a");
        el.setAttribute("href", url);
        el.setAttribute("title", title);

        var range = sel.getRangeAt(0).cloneRange();
        range.surroundContents(el);
        sel.removeAllRanges();
        sel.addRange(range);
    }
    RE.callback();
}

RE.setTodo = function (text) {
    var html = '<input type="checkbox" name="' + text + '" value="' + text + '"/> &nbsp;';
    document.execCommand('insertHTML', false, html);
}

RE.prepareInsert = function () {
    RE.backuprange();
}

RE.backuprange = function () {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        RE.currentSelection = {
            "startContainer": range.startContainer,
            "startOffset": range.startOffset,
            "endContainer": range.endContainer,
            "endOffset": range.endOffset
        };
    }
}

RE.restorerange = function () {
    var selection = window.getSelection();
    selection.removeAllRanges();
    var range = document.createRange();
    range.setStart(RE.currentSelection.startContainer, RE.currentSelection.startOffset);
    range.setEnd(RE.currentSelection.endContainer, RE.currentSelection.endOffset);
    selection.addRange(range);
}

RE.enabledEditingItems = function (e) {
    var items = [];
    if (document.queryCommandState('bold')) {
        items.push('bold');
    }
    if (document.queryCommandState('italic')) {
        items.push('italic');
    }
    if (document.queryCommandState('subscript')) {
        items.push('subscript');
    }
    if (document.queryCommandState('superscript')) {
        items.push('superscript');
    }
    if (document.queryCommandState('strikeThrough')) {
        items.push('strikeThrough');
    }
    if (document.queryCommandState('underline')) {
        items.push('underline');
    }
    if (document.queryCommandState('insertOrderedList')) {
        items.push('orderedList');
    }
    if (document.queryCommandState('insertUnorderedList')) {
        items.push('unorderedList');
    }
    if (document.queryCommandState('justifyCenter')) {
        items.push('justifyCenter');
    }
    if (document.queryCommandState('justifyFull')) {
        items.push('justifyFull');
    }
    if (document.queryCommandState('justifyLeft')) {
        items.push('justifyLeft');
    }
    if (document.queryCommandState('justifyRight')) {
        items.push('justifyRight');
    }
    if (document.queryCommandState('insertHorizontalRule')) {
        items.push('horizontalRule');
    }
    var formatBlock = document.queryCommandValue('formatBlock');
    if (formatBlock.length > 0) {
        items.push(formatBlock);
    }
    // Check if highlighting is active
    var highlightsActive = document.querySelectorAll('.highlighted-text').length > 0;
    if (highlightsActive) {
        items.push('highlight');
    }

    window.location.href = "re-state://" + encodeURI(items.join(','));
}

RE.focus = function () {
    var range = document.createRange();
    range.selectNodeContents(RE.editor);
    range.collapse(false);
    var selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
    RE.editor.focus();
}

RE.blurFocus = function () {
    RE.editor.blur();
}

RE.removeFormat = function () {
    document.execCommand('removeFormat', false, null);
}

RE.isListeningHighLightTyping = false;

RE.setHighlight = function () {
    RE.shouldInsertPlaceholder = !RE.shouldInsertPlaceholder;

    // Get the current selection
    var selection = window.getSelection();
    console.log("setHighlight selection.rangeCount: ",selection.rangeCount)
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const preCaretRange = range.cloneRange(); // Clone the current range to manipulate
        preCaretRange.selectNodeContents(document.getElementById('editor')); // Select all contents of the editor
        preCaretRange.setEnd(range.endContainer, range.endOffset); // Set the end of the range to the current cursor position

        // Extract the start and end positions
        var startOffset = range.startOffset;
        var endOffset = range.endOffset;

        // You can also get the node where the cursor is positioned
        var startContainer = range.startContainer;

        const currentNode = getCursorNode()
        // Log or use the cursor position and node as needed
        console.log("Cursor Position - Start Offset: ", startOffset);
        console.log("currentNode", currentNode);
        console.log("Cursor Position - Start Container: ", startContainer);

        RE.startHighLightPos = startOffset

        console.log("setHighlight startOffset: ",startOffset)
    }

    handleTextInputAndHighLight()
}

function getCursorNode() {
    const selection = window.getSelection();
    let cursorNode = null;

    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        cursorNode = range.startContainer; // This is the node where the cursor is currently positioned
    }

    return cursorNode;
}

function handleTextInputAndHighLight() {
    // console.log('TUANNH RE.shouldInsertPlaceholder:', RE.shouldInsertPlaceholder)
    if (RE.shouldInsertPlaceholder) {
        console.log('text selectedA.');
        var color = '#2C588E';
        var selectedText = ''

        // Get the current selection
        var selection = document.getSelection();
        // console.log('Current selection:', selection); // Log the selection

        if (selection.rangeCount > 0) {
            var range = selection.getRangeAt(0);

            selectedText = range.toString().trim(); // Get the selected text
            console.log('selection.rangeCount:', selectedText)
        }
        if (selectedText === '') {
            selectedText = RE.editor.innerText
            var startPosition = RE.startHighLightPos;
            console.log('startPosition:', startPosition)
            if (startPosition >= 0) {
                // Create a new range
                var range = document.createRange();

                // Set the start of the range based on the desired position
                var startNode = editor.lastChild; // Assuming the text is in the first child node
                console.log("TUANNH startNode: ", startNode)

                if(startNode && startNode.nodeType === Node.TEXT_NODE) {
                    console.log('text selectedB.');
                    range.setStart(startNode, startPosition);

                    // Set the end of the range to the end of the text content
                    range.setEnd(startNode, startNode.textContent.length);

                    // Create a span with the desired styles
                    var span = document.createElement('span');
                    span.className = 'highlighted-text';
                    span.style.backgroundColor = color;
                    span.style.color = 'white'; // For text color
                    span.style.borderRadius = '4px';
                    span.style.padding = '2px 6px';
                    span.style.lineHeight = '1';

                    // Extract the contents of the range and insert the span
                    var selectedText = range.extractContents();
                    if (selectedText && selectedText.textContent.trim() !== "") {
                        console.log('text selectedC.');
                        span.appendChild(selectedText);
                        range.insertNode(span);

                        // Collapse the range to the end of the span
                        range.setStartAfter(span);
                        range.collapse(true);

                        // Clean up the selection
                        var selection = window.getSelection();
                        selection.removeAllRanges();
                        selection.addRange(range);

                        // Focus the editor to allow typing
                        RE.editor.focus();
                    }
                }
            }
        } else {
            console.log('text selectedD.');
            // Check if there's existing content to avoid duplicating numbers
            var existingHighlights = document.querySelectorAll('.highlighted-text');
            if (existingHighlights.length > 0) {
                number = existingHighlights.length + 1; // Increment number based on existing highlights
            }

            // Create a span with the desired styles
            var span = document.createElement('span');
            span.className = 'highlighted-text';
            span.style.backgroundColor = color;
            span.style.color = 'white'; // For text color
            span.style.borderRadius = '4px';
            span.style.padding = '2px 6px';

            // Create a text node for the selected text
            var textNode = document.createTextNode(selectedText);

            // Wrap the selected text with the styled span
            // span.appendChild(indexSpan);
            span.appendChild(textNode);

            // Replace the selected text with the styled span
            range.deleteContents(); // Remove the selected text
            range.insertNode(span); // Insert the new styled text

            // console.log('Text after styling:', span.outerHTML); // Log the HTML of the styled text

            // Remove selection to avoid further unintended edits
            selection.removeAllRanges();
            RE.editor.focus();
        }
    } else {
        console.log("Text selectedF");
        // Get the current selection
        var selection = window.getSelection();
        console.log("Selection rangeCount", selection.rangeCount);
        
        // Check if there's any selection range
        if (selection.rangeCount > 0) {
            console.log("Text selectedG");
            console.log("TUANNH selection data: ", selection);
            var range = selection.getRangeAt(0);
            // Get the parent node of the current cursor position
            var currentNode = range.commonAncestorContainer;
            console.log("TUANNH currentNode data: ", currentNode);

            // If the current node is a text node, get its parent element
            var parentElement = currentNode.nodeType === Node.TEXT_NODE ? currentNode.parentElement : currentNode;

            // Check if the cursor is inside a span with the class 'highlighted-text'
            var highlightedSpan = parentElement.closest('.highlighted-text');
            console.log("highlightedSpan", highlightedSpan);
            
            if (highlightedSpan) {
                console.log("Text selectedH");
                // Cursor is inside the highlighted text, move it outside of the span
                var newTextNode = document.createTextNode('\u200B'); // Zero-width space to keep cursor
                highlightedSpan.parentNode.insertBefore(newTextNode, highlightedSpan.nextSibling);

                // Update the range to position the cursor after the newly created text node
                range.setStartAfter(newTextNode);
                range.collapse(true); // Collapse the range to move the cursor after the text node

                // Clear the current selection and apply the new range
                selection.removeAllRanges();
                selection.addRange(range);

                // Remove the input event listener after handling the input
                const inputHandler = function() {
                    console.log("Handling input after moving cursor");
                    // Remove zero-width space after typing begins
                    var content = RE.editor.innerHTML;
                    content = content.replace(/\u200B/g, '');
                    RE.editor.innerHTML = content;

                    // Move the cursor back to the end after content is updated
                    setCursorToEnd(RE.editor);

                    // Remove this listener to avoid repeated execution
                    RE.editor.removeEventListener('input', inputHandler);
                };

                RE.editor.addEventListener('input', inputHandler);
                RE.editor.focus();
            }
        }
    }
}

// This function attempts to restore the cursor position to a logical place after text changes.
function restoreCursorPosition(editor) {
    var selection = window.getSelection();
    if (selection.rangeCount > 0) {
        var range = selection.getRangeAt(0);
        var currentNode = range.endContainer;

        // Move cursor to the next valid node if it's at the end of its container
        while (currentNode.nodeType === Node.TEXT_NODE && !currentNode.nextSibling && currentNode.parentNode) {
            currentNode = currentNode.parentNode;
            if (currentNode.nextSibling) {
                var newRange = document.createRange();
                newRange.setStartAfter(currentNode);
                newRange.collapse(true);
                selection.removeAllRanges();
                selection.addRange(newRange);
                break;
            }
        }
    }
}

// Helper function to move cursor to the end of the editor
function setCursorToEnd(element) {
    var range = document.createRange();
    var selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
    element.focus();
}

// Function to remove the entire highlight if the text inside is deleted
// RE.removeHighlightOnEmpty = function () {
//     var highlights = document.querySelectorAll('.highlighted-text');
//     highlights.forEach(function (highlight) {
//         var textContent = highlight.textContent.replace(highlight.querySelector('.index').textContent, '').trim();
//         if (textContent === '') {
//             highlight.remove(); // Remove the entire highlight if text is empty
//         }
//     });
// }

// Bind the removeHighlightOnEmpty function to the input event to handle text deletion
// RE.editor.addEventListener('input', RE.removeHighlightOnEmpty);

// Event Listeners
// RE.editor.addEventListener("input", RE.callback);
RE.editor.addEventListener("input", function (event) {
    if (event.inputType === "deleteContentBackward" || event.inputType === "deleteContentForward") {
        console.log('Delete event triggered.');
        return; // Skip normal input handling
    }

    console.log('Input event triggered.');
    handleTextInputAndHighLight();

    RE.callback();
});
RE.editor.addEventListener("keyup", function (e) {
    var KEY_LEFT = 37, KEY_RIGHT = 39;
    if (e.which == KEY_LEFT || e.which == KEY_RIGHT) {
        RE.enabledEditingItems(e);
    }
});
RE.editor.addEventListener("click", RE.enabledEditingItems);
