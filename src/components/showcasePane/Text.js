import React from "react";
import PropTypes from "prop-types";
import { isPropTypeHexColor } from "../../utils";
import { ELEMENTS } from "../../constants";
import "./styles/Text.css";

const Text = ({ background, elementsStyles }) => (
  <div
    className="Text"
    style={{
      backgroundColor: `${background.color}`,
      ...elementsStyles.body
    }}
  >
    <div className="text-wrapper">
      <h1 style={elementsStyles.h1}>Lorem ipsum dolor sit amet</h1>

      <p style={elementsStyles.p}>
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget,
        arcu.
      </p>

      <h2 style={elementsStyles.h2}>Sapiente sed voluptatibus neque</h2>

      <p style={elementsStyles.p}>
        In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam
        dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus.
        Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean
        leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam
        lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus
        viverra nulla ut metus varius laoreet. Quisque rutrum.
      </p>

      <ul style={elementsStyles.li}>
        <li>Lorem ipsum</li>
        <li>Dolor sit</li>
        <li>Adipisicing elit</li>
        <li>Doloribus</li>
        <li>Odio praesentium</li>
        <li>Consectetur</li>
      </ul>

      <p style={elementsStyles.p}>
        Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper
        ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus
        eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing
        sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar,
        hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec
        vitae sapien ut libero venenatis faucibus.
      </p>

      <h3 style={elementsStyles.h3}>Corrupti quia optio maiores*</h3>

      <p style={elementsStyles.p}>
        Cras ultricies mi eu turpis hendrerit fringilla. Vestibulum ante ipsum
        primis in faucibus orci luctus et ultrices posuere cubilia Curae; In ac
        dui quis mi consectetuer lacinia. Nam pretium turpis et arcu. Duis arcu
        tortor, suscipit eget, imperdiet nec, imperdiet iaculis, ipsum. Sed
        aliquam ultrices mauris. Integer ante arcu, accumsan a, consectetuer
        eget, posuere ut, mauris. Praesent adipiscing.
      </p>

      <h4 style={elementsStyles.h4}>Dolorum labore accusamus dolor</h4>

      <p style={elementsStyles.p}>
        Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis
        leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna.
        Sed consequat, leo eget bibendum sodales, augue velit cursus nunc, quis
        gravida magna mi a libero. Fusce vulputate eleifend sapien. Vestibulum
        purus quam, scelerisque ut, mollis sed, nonummy id, metus. Nullam
        accumsan lorem in dui.
      </p>

      <h4 style={elementsStyles.h4}>Fuga autem rerum</h4>

      <p style={elementsStyles.p}>
        Phasellus ullamcorper ipsum rutrum nunc. Nunc nonummy metus. Vestibulum
        volutpat pretium libero. Cras id dui. Aenean ut eros et nisl sagittis
        vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet
        feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec
        sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci.
        Nunc nec neque.
      </p>

      <h4 style={elementsStyles.h4}>Sunt facere reprehenderit facilis</h4>

      <p style={elementsStyles.p}>
        Phasellus leo dolor, tempus non, auctor et, hendrerit quis, nisi.
        Curabitur ligula sapien, tincidunt non, euismod vitae, posuere
        imperdiet, leo. Maecenas malesuada. Praesent congue erat at massa. Sed
        cursus turpis vitae tortor. Donec posuere vulputate arcu. Phasellus
        accumsan cursus velit. Vestibulum ante ipsum primis in faucibus orci
        luctus et ultrices posuere cubilia Curae; Sed aliquam, nisi quis
        porttitor congue, elit erat euismod orci, ac placerat dolor lectus quis
        orci.
      </p>

      {
        <p>
          <small style={elementsStyles.small}>
            * Fusce id purus. Ut varius tincidunt libero. Phasellus dolor.
            Maecenas vestibulum mollis
          </small>
        </p>
      }
    </div>
  </div>
);

Text.propTypes = {
  elementsStyles: PropTypes.exact(
    ELEMENTS.reduce((checks, element) => {
      checks[element] = PropTypes.exact({
        color: isPropTypeHexColor,
        fontFamily: PropTypes.string.isRequired,
        fontSize: PropTypes.string.isRequired,
        fontStyle: PropTypes.string.isRequired,
        fontWeight: PropTypes.number.isRequired
      });

      return checks;
    }, {})
  ),
  background: PropTypes.exact({
    color: isPropTypeHexColor
  }).isRequired
};

export default Text;
