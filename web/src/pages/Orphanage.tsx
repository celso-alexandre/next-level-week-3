import React, { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiClock, FiInfo } from 'react-icons/fi';
import { Map, Marker, TileLayer } from 'react-leaflet';

import '../styles/pages/orphanage.css';
import { useParams } from 'react-router-dom';
import SideBar from '../components/Sidebar';

import happyMapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
  name: string;
  latitude: number;
  longitude: number;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: Array<{
    id: number;
    url: string
  }>;
}

interface RouteParams {
  id: string;
}

const Orphanage: React.FunctionComponent = () => {
  const { id } = useParams<RouteParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>({ latitude: -23.5258293, longitude: -47.4392362 } as Orphanage);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    api.get(`orphanages/${id}`).then((response) => {
      setOrphanage(response.data);
    });
  }, [id]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  const handleImageSelect = (key: number) => {
    setActiveImageIndex(key);
  };

  return (
    <div id="page-orphanage">
      <SideBar />

      <main>
        <div className="orphanage-details">
          {orphanage.images && orphanage.images.length > 0
            && <img src={orphanage.images[activeImageIndex].url} alt={`Imagem selecionada, ${orphanage.name}`} />}
          <div className="images">
            {orphanage.images && orphanage.images.map((image, index) => (
              <button key={image.id} onClick={() => handleImageSelect(index)} type="button" className={(index === activeImageIndex ? 'active' : '')}>
                <img
                  src={image.url}
                  alt={`Imagem ${index}, ${orphanage.name}`}
                />
              </button>
            ))}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={happyMapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`} target="_blank" rel="noopener noreferrer">Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {orphanage.open_on_weekends ? 'Segunda à Domingo' : 'Segunda à Sexta'}
                <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos
                  {' '}
                  <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends not-open">
                  <FiInfo size={32} color="#DD669D" />
                  Não atendemos
                  {' '}
                  <br />
                  fim de semana
                </div>
              )}
              )
            </div>

            <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Orphanage;
