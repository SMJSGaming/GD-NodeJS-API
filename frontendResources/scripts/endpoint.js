function navscroll() {
    let height = $(document).scrollTop();
    if (height != 0) {
        $(".nav").addClass("navalt");
        $(".logo").addClass("logoalt");
    } else {
        $(".nav").removeClass("navalt");
        $(".logo").removeClass("logoalt");
    }
}