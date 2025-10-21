class HtmlGenerator {
    createTag(tagName, tagId) {
        const search = document.getElementById(tagId);
        if (search) {
            throw 'element with tag "' + tagName + '" already exists.';
        } else {
            const element = document.createElement(tagName);
            element.id = tagId;
            document.body.appendChild(element);
        }
    }

    setAttribute(tagId, attributeNames, attributeValues) {
        if (attributeNames.length === attributeValues.length) {
            const element = document.getElementById(tagId);
            if (element) {
                for (let i = 0; i < attributeNames.length; i++) {
                    element.setAttribute(attributeNames[i], attributeValues[i]);
                }
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
            element.setContent(content);
        }
        else {
            throw 'element with tag "' + tagId + '" not exists.';

        }
    }

    setEventListener(tagId, eventName, event) {

    }


}