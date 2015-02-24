/* ========================================================================
 * Omega: contact.js
 * Handles contact form for HTML
 * ========================================================================
 * Copyright 2014 Oxygenna LTD
 * ======================================================================== */

'use strict';

jQuery(document).ready(function($) {

    // bind submit handler to form
    $('.contact-form').on('submit', function(e) {
        var $form = $(this);
        var $submitButton = $form.find('button');
        var $messageContainer = $form.find('.messages');
        // prevent native submit
        e.preventDefault();
        // submit the form
        $form.ajaxSubmit({
            type: 'post',
            dataType: 'json',
            beforeSubmit: function() {
                // disable submit button
                $submitButton.attr('disabled','disabled');
                // add spinner icon
                $submitButton.find('i').removeClass().addClass('fa fa-circle-o-notch fa-spin');
            },
            success: function(response, status, xhr, form) {
                if(response.status === 'ok') {
                    // mail sent ok - display sent message
                    for(var msg in response.messages) {
                        showInputMessage(response.messages[msg], 'success', $messageContainer);
                    }
                    // clear the form
                    form[0].reset();
                }
                else {
                    for(var error in response.messages) {
                        showInputMessage(response.messages[error], 'danger', $messageContainer);
                    }
                }
                // make button active
                $submitButton.removeAttr('disabled');
            },
            error: function(response) {
                for(var error in response.messages) {
                    showInputMessage(response.messages[error], 'warning', $messageContainer);
                }
                // make button active
                $submitButton.removeAttr('disabled');
            }
        });
        return false;
    });

    function showInputMessage(message, status, messageContainer) {
        messageContainer.empty();
        messageContainer.append('<div class="element-top-20 alert alert-' + status + '" role="alert">' + message.message + '</div>');
    }
});