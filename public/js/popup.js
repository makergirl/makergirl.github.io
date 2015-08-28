function loadPopup() {
  require(["mojo/signup-forms/Loader"], function(L) { L.start({"baseUrl":"mc.us10.list-manage.com","uuid":"875a6b34dd923b7eda9127124","lid":"4b90876c8d"}) })
}

jQuery(window).load(function() {
    document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
  });

jQuery('body').on('click', '.mc-closeModal', function() {
  document.cookie = "MCEvilPopupClosed=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
});
