import { observer } from "mobx-react-lite";
import React from "react";
import example from "../assets/images/example.png";
import chefStore from "../store/ChefStore";
import { Link } from "react-router-dom";

const Restaurants = observer(({ h2_text }) => {
  return (
    <section className="restaurants">
      <h2>{h2_text}</h2>
      <div className="list-block">
        {chefStore.chefs.map((o, i) => (
          <Link className="wrap" key={i} to={`/chefs/${o.user.user_id}`}>
            <div className="rest-block">
              <img
                style={{ width: 150 }}
                src={
                  o.user.profile_pic
                    ? `http://localhost:5000${o.user.profile_pic}`
                    : example
                }
                alt="chef_picture"
              />
              <div style={{ marginTop: 5 }} className="div">
                {o.user.name}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
});

export default Restaurants;
