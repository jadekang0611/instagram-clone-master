import React from 'react';
import { useProfilePictureStyles } from '../../styles';
import { Person } from '@material-ui/icons';

function ProfilePicture({
  size,
  image = 'https://media.licdn.com/dms/image/C5603AQEc7KLxlNmepQ/profile-displayphoto-shrink_400_400/0/1629602117313?e=1677715200&v=beta&t=DQsUN-iAPSQ_xxQvofjuvoc8tAh9P_B1scn5ZQyVA0o',
  isOwner,
}) {
  const classes = useProfilePictureStyles({ size, isOwner });

  return (
    <section className={classes.section}>
      {image ? (
        <div className={classes.wrapper}>
          <img src={image} alt='user profile' className={classes.image} />
        </div>
      ) : (
        <div className={classes.wrapper}>
          <Person className={classes.person} />
        </div>
      )}
    </section>
  );
}

export default ProfilePicture;
