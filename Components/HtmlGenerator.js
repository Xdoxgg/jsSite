
class HtmlGenerator {
    static createTag(parentElement, tagName, tagId) {
        const search = document.getElementById(tagId);
        if (search) {
            throw 'element with tag "' + tagName + '" already exists.';
        } else {
            const element = document.createElement(tagName);
            element.id = tagId;
            parentElement.appendChild(element);
            return true;

        }
    }

    static setAttribute(tagId, attributeNames, attributeValues) {
        if (attributeNames.length === attributeValues.length) {
            const element = document.getElementById(tagId);
            if (element) {
                for (let i = 0; i < attributeNames.length; i++) {
                    element.setAttribute(attributeNames[i], attributeValues[i]);
                }
                return true;

            } else {
                throw 'element with tag "' + tagId + '" not exists.';
            }
        } else {
            throw 'not all attributes have values.'
        }
    }

    static setContent(tagId, content) {
        const element = document.getElementById(tagId);
        if (element) {
            element.textContent = content;
            return true;

        } else {
            throw 'element with tag "' + tagId + '" not exists.';

        }
    }

    static setEventListener(tagId, eventName, event) {
        const element = document.getElementById(tagId);
        if (element) {
            element.addEventListener(eventName, event);
            return true;
        } else {
            throw 'element with tag "' + tagId + '" not exists.';

        }
    }
}