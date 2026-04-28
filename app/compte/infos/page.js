import { requireUser } from '@/lib/auth';
import { ProfileForm } from '@/components/account/ProfileForm';

export const metadata = { title: 'Mes infos & préférences' };

export default async function InfosPage() {
  const { dbUser } = await requireUser();

  return (
    <div className="space-y-8">
      <header>
        <p className="text-xs text-pau-yellow uppercase tracking-wider">Mon profil</p>
        <h1 className="mt-3 font-display text-5xl uppercase leading-crush tracking-tightest text-white md:text-6xl">
          Mes infos
        </h1>
      </header>

      <ProfileForm user={dbUser} />
    </div>
  );
}
