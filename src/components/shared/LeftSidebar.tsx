import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesandmutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/authContext';
import { sidebarLinks } from '@/constants';
import { INavLink } from '@/types';

const LeftSidebar = () => {
  const { pathname } = useLocation();
  const { mutate: signOut, isSuccess } = useSignOutAccount();
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (isSuccess) {
      navigate(0)
    }
  }, [isSuccess])

  return (
    <nav className='leftsidebar'>
      <div className='flex flex-col gap-11'>
        <Link to='/' className='flex gap-3 items-center'>
          <img src='/Assets/images/logo.svg' alt='img' height={36} width={170} />
        </Link>
        <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
          <img src={user.imageUrl || '/Assets/icons/profile-placeholder'}
            alt='avatar' className='h-14 w-14 rounded-full' />
          <div className='flex flex-col'>
            <p className='body-bold'>{user.name}</p>
            <p className='small-regular text-light-3'>@{user.username}</p>
          </div>
        </Link>

        <ul className='flex flex-col gap-6'>
          {sidebarLinks.map((link: INavLink) => {
            const isActive = pathname === link.route
            return (
              <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                 <NavLink to={link.route} className='flex gap-2 p-2 items-center'>
                  <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`}/>
                  {link.label}
                 </NavLink>
              </li>
            )
          })}
        </ul>

        <Button variant='ghost' className='shad-button_ghost ' onClick={() => signOut()}>
          <img src='/Assets/icons/logout.svg' alt='logout' />
          <p className='small-medium lg:base-medium'>Log out</p>
        </Button>
      </div>
    </nav>
  )
}

export default LeftSidebar