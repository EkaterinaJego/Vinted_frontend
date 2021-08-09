import Product from "../components/Product";

const Offer = ({ token, info, setInfo }) => {
  return (
    <>
      <Product token={token} info={info} setInfo={setInfo} />
    </>
  );
};

export default Offer;
