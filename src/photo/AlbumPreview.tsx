import Image from '../components/Image';
import { Link } from 'react-router';
import { IAlbum } from '../utilities';

const AlbumPreview = ({ albums }: { albums: IAlbum[]; selectedAlbum: IAlbum }) => {
  return (
    <div className="AlbumPreview">
      {albums.map(album => (
        <Link to={`/photo/${album.key}`} key={album.key} className={'AlbumPreview__link'}>
          <Image
            sizeOn={album.photos[0].width > album.photos[0].height ? 'h' : 'w'}
            photo={album.photos[0]}
            alt={album.location}
            className={'AlbumPreview__image'}
          />
        </Link>
      ))}
    </div>
  );
};

export default AlbumPreview;
