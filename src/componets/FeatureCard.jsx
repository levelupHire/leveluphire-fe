export default function FeatureCard({ icon: Icon, title, description }) {
    return (
      <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg">
        <Icon className="h-10 w-10 text-primary mb-4" />
        <h3 className="text-lg font-semibold text-primary-dark mb-2">{title}</h3>
        <p className="text-black">{description}</p>
      </div>
    );
  }