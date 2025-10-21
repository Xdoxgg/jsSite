class HtmlGenerator {
    createTag(parentElement, tagName, tagId) {
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

    setAttribute(tagId, attributeNames, attributeValues) {
        if (attributeNames.length === attributeValues.length) {
            const element = document.getElementById(tagId);
            if (element) {
                for (let i = 0; i < attributeNames.length; i++) {
                    element.setAttribute(attributeNames[i], attributeValues[i]);
                }
                return true;

            }
            else {
                throw 'element with tag "' + tagId + '" not exists.';
            }
        } else {
            throw 'not all attributes have values.'
        }
    }

    setContent(tagId, content) {
        const element = document.getElementById(tagId);
        if (element) {
            element.textContent = content;
            return true;

        }
        else {
            throw 'element with tag "' + tagId + '" not exists.';

        }
    }

    setEventListener(tagId, eventName, event) {
        const element = document.getElementById(tagId);
        if (element) {
            element.setEventListener(tagId, eventName, event);
            return true;
        }
        else {
            throw 'element with tag "' + tagId + '" not exists.';

        }
    }


}