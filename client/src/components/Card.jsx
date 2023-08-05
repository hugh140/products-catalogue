import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function Card({ data }) {
  return (
    <div className="card mx-auto" style={{ width: "18rem" }}>
      <Link
        to={`/producto/${data.idProducto}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <img src={data.imgProducto} className="card-img-top" alt={data.nombreProducto} />
        <div className="card-body">
          <h3 className="card-title">${data.precioProducto}</h3>
          <h5>{data.nombreProducto}</h5>
          <p className="card-text">{data.descrProducto}</p>
        </div>
      </Link>
    </div>
  );
}

Card.propTypes = {
  data: PropTypes.object,
};

export default Card;
