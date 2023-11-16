import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { useSignOutAccount } from '@/lib/react-query/queriesandmutations';
import { useEffect } from 'react';
import { useUserContext } from '@/context/authContext';

const Topbar = () => {
    const { mutate: signOut, isSuccess } = useSignOutAccount();
    const navigate = useNavigate();
    const { user } = useUserContext();

    useEffect(() => {
        if (isSuccess) {
            navigate(0)
        }
    }, [isSuccess])
    
    return (
        <section className='topbar'>
            <div className='flex-between py-4 px-5'>
                <Link to='/' className='flex gap-3 items-center'>
                    <img src='/Assets/images/logo.svg' alt='img' />
                </Link>

                <div className='flex gap-4'>
                    <Button variant='ghost' className='shad-button_ghost' onClick={() => signOut()}>
                        <img src='/Assets/icons/logout.svg' alt='logout' />
                    </Button>
                    <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                        <img src={user.imageUrl || '/Assets/icons/profile-placeholder.svg'}
                            alt='avatar' className='h-8 w-8 rounded-full' />
                    </Link>
                </div>
            </div>
        </section>
    );
}

export default Topbar;
