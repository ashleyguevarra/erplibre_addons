odoo.define("erplibre_website_cv.animation", require => {
    "use strict";

    let sAnimation = require("website.content.snippets.animation");
    let ajax = require("web.ajax");

    sAnimation.registry.erplibre_website_cv = sAnimation.Class.extend({
        selector: ".o_erplibre_website_cv",
    
        start: function () {
            let self = this;
    
            this._desctextList = this.el.getElementsByClassName("desc-text");
            for (const element of this._desctextList) {
                element.setAttribute("contenteditable", "true");
                element.addEventListener("input", function (event) {
                    // Get the updated value from the contenteditable element
                    let updatedValue = event.target.innerHTML;
    
                    // Send an HTTP request to update_aliment method in the controller
                    // with the updated value and the field name as parameters
                    $.ajax({
                        url: '/erplibre_website_cv/website_update',
                        type: 'POST',
                        data: {
                            'informations_id': event.target.id,  // Assuming id attribute contains the record id
                            'informations_name': updatedValue,
                        },
                        success: function (result) {
                            // Handle success response
                            if (result) {
                                console.log('Record updated successfully!');
                            } else {
                                console.error('Failed to update record.');
                            }
                        },
                        error: function () {
                            console.error('Failed to update record.');
                        }
                    });
                });
            }   
            /*
            // Assuming the "Edit" button has a CSS class of "edit-button" and the target elements have a CSS class of "desc-text"
            var editButton = document.querySelector('.edit-page-menu');

            // Add event listener to the "Edit" button
            editButton.addEventListener('click', function (event) {
                // Get all elements with class "desc-text"
                var descTextList = document.getElementsByClassName('desc-text');

                // Loop through the "desc-text" elements and set "contenteditable" attribute to true
                for (var i = 0; i < descTextList.length; i++) {
                    descTextList[i].setAttribute('contenteditable', 'false');
                }
            });
            */
        },
        updateInformations: function (self) {
            self.el.addEventListener("keyup", event => {
                event.preventDefault();

                if (event.which === 13) {
                    event.target.innerHTML = event.target.textContent;
                    event.target.blur();
                    return false;
                }

                if (!event.target.classList.contains("informations__text")) {
                    return;
                }

                const informationsId = event.target.parentElement.id;
                const informationsName = event.target.textContent;

                ajax.jsonRpc(
                    "/erplibre_website_cv/website_update",
                    "call",
                    {
                        "informations_id": alimentId,
                        "informations_name": alimentName
                    }
                ).done(data => {
                    return true;
                })
            });
        },
        destroy: function () {
            this._super.apply(this, arguments);
            if (this._$loadedContent) {
                this._informationsList.innerHTML = this._originalContent;
            }
        }
    });
});