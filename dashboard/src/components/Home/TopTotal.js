import React from "react";

const TopTotal = (props) => {
  const { products } = props;
  return (
    <div className="row">
      <div className="col-lg-4">
        <div className="card card-body mb-4 shadow-sm">
          <article className="icontext">
            <span className="icon icon-sm rounded-circle alert-warning">
              <i className="text-warning fas fa-shopping-basket"></i>
            </span>
            <div className="text">
            {products ? <span>{products.length}</span> : <span>0</span>}
             
            </div>
          </article>
        </div>
      </div>
    </div>
  );
};

export default TopTotal;
