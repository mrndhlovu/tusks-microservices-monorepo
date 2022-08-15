import { useRouter } from 'next/router';
import { apiClient } from '../../../api';
import { IPowerUp } from './PowerUps';
import {
  SPOTIFY_ACCESS_SCOPES,
  SPOTIFY_LOGO,
  SPOTIFY_REVOKE_ACCESS_ENDPOINT,
} from '../../../util/constants';
import PowerUpListItem from './PowerUpListItem';

const Spotify = ({ powerUp }: { powerUp: IPowerUp }) => {
  const { newSpotify } = useRouter()?.query;

  const isActive = powerUp?.status === 'active';

  const handleConnect = () => {
    const state = '';
    apiClient
      .getSpotifyRedirectUrl(SPOTIFY_ACCESS_SCOPES.join('|'), state)
      .then(res => window.location.assign(res.data.url))
      .catch(err => {});
  };

  const handleRevoke = () => {
    apiClient
      .revokeSpotifyAccess(powerUp.id)
      .then(res => {})
      .catch(err => {})
      .finally(() => {
        window.location.assign(SPOTIFY_REVOKE_ACCESS_ENDPOINT);
      });
  };

  return (
    <PowerUpListItem
      handleConnect={handleConnect}
      handleRevoke={handleRevoke}
      activeSince={powerUp?.createdAt.split('T')[0]}
      description="Controls playback on all devices from your board and manage your playlists."
      isActive={isActive}
      image={SPOTIFY_LOGO}
      title="Spotify"
      isNew={newSpotify !== undefined}
    />
  );
};

export default Spotify;
