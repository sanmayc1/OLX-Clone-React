import "./Banner.css";
function Banner() {
  return (
    <div className="bannerParentDiv">
      <div className="bannerChildDiv">
        <div className="menuBar">
          <div className="categoryMenu">
            <span>ALL CATEGORIES</span>
          </div>
          <div className="otherQuickOptions">
            <span>Electronics</span>
            <span>Vehicles</span>
            <span>Prperty</span>
            <span>Furniture</span>
            <span>Books</span>
          </div>
        </div>
        <div className="banner"></div>
      </div>
    </div>
  );
}

export default Banner;
