import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Trash2, 
  Eye,
  X,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  AlertTriangle
} from 'lucide-react';
import { useRegistrations, useDeleteRegistration } from '@/hooks/useAdmin';
import { Button } from '@/components/ui';
import type { Registrant } from '@/types';

export function RegistrationsTable() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [selectedRegistrant, setSelectedRegistrant] = useState<Registrant | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Registrant | null>(null);
  const pageSize = 10;

  const { data, isLoading, error } = useRegistrations(page, pageSize, search);
  const deleteRegistration = useDeleteRegistration();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
    setPage(1);
  };

  const handleDeleteConfirm = () => {
    if (deleteTarget) {
      deleteRegistration.mutate(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  if (isLoading) {
    return <TableSkeleton />;
  }

  // Handle 401 - unauthorized, need to re-login
  if (error && (error as any)?.response?.status === 401) {
    return (
      <div className="glass-card p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Session Expired</h3>
        <p className="text-white/60 mb-4">Your login session has expired. Please log in again.</p>
        <Button onClick={() => window.location.href = '/login'}>
          Go to Login
        </Button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <AlertTriangle className="w-12 h-12 text-red-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">Failed to load registrations</h3>
        <p className="text-white/60">{(error as Error)?.message || 'An error occurred while fetching data'}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
          <input
            type="text"
            placeholder="Search by name, email, phone, or location..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="input-field pl-10"
          />
        </div>
        <Button type="submit" variant="secondary">
          Search
        </Button>
      </form>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-white/60 font-medium">Name</th>
                <th className="text-left p-4 text-white/60 font-medium hidden md:table-cell">Email</th>
                <th className="text-left p-4 text-white/60 font-medium hidden lg:table-cell">Location</th>
                <th className="text-left p-4 text-white/60 font-medium hidden sm:table-cell">Coming With</th>
                <th className="text-left p-4 text-white/60 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(!data?.items || data.items.length === 0) ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center">
                    <Users className="w-12 h-12 text-white/20 mx-auto mb-4" />
                    <p className="text-white/60">No registrations found</p>
                    {search && <p className="text-white/40 text-sm mt-2">Try adjusting your search criteria</p>}
                  </td>
                </tr>
              ) : (
                data.items.map((registrant, index) => (
                <motion.tr
                  key={registrant.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-colors"
                >
                  <td className="p-4">
                    <div>
                      <p className="text-white font-medium">{registrant.fullName}</p>
                      <p className="text-white/40 text-sm">{registrant.sex}</p>
                    </div>
                  </td>
                  <td className="p-4 hidden md:table-cell">
                    <p className="text-white/80">{registrant.email}</p>
                  </td>
                  <td className="p-4 hidden lg:table-cell">
                    <p className="text-white/80">{registrant.locationState}</p>
                  </td>
                  <td className="p-4 hidden sm:table-cell">
                    <span className="px-2 py-1 bg-white/10 rounded-full text-sm text-white/80">
                      {registrant.comingWith}
                      {registrant.numberOfPersons > 0 && ` (+${registrant.numberOfPersons})`}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedRegistrant(registrant)}
                        className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                        title="View details"
                      >
                        <Eye className="w-4 h-4 text-white/60" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(registrant)}
                        className="p-2 hover:bg-red-500/20 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 text-red-400" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              )))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.totalPages > 1 && (
          <div className="flex items-center justify-between p-4 border-t border-white/10">
            <p className="text-white/60 text-sm">
              Showing {(page - 1) * pageSize + 1} to{' '}
              {Math.min(page * pageSize, data.totalCount)} of {data.totalCount}
            </p>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="px-4 py-2 text-white/80">
                {page} / {data.totalPages}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
                disabled={page === data.totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedRegistrant && (
          <RegistrantDetailModal
            registrant={selectedRegistrant}
            onClose={() => setSelectedRegistrant(null)}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteTarget && (
          <DeleteConfirmationModal
            registrant={deleteTarget}
            onConfirm={handleDeleteConfirm}
            onCancel={() => setDeleteTarget(null)}
            isDeleting={deleteRegistration.isPending}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function RegistrantDetailModal({
  registrant,
  onClose,
}: {
  registrant: Registrant;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <h2 className="text-xl font-semibold text-white">Registration Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-white/60" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-3xl font-bold text-primary-900">
              {registrant.fullName.charAt(0)}
            </div>
            <h3 className="mt-3 text-xl font-semibold text-white">{registrant.fullName}</h3>
            <p className="text-white/60">{registrant.sex}</p>
          </div>

          <div className="grid gap-4">
            <div className="flex items-center gap-3 text-white/80">
              <Mail className="w-5 h-5 text-gold-400" />
              <span>{registrant.email}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Phone className="w-5 h-5 text-gold-400" />
              <span>{registrant.phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <MapPin className="w-5 h-5 text-gold-400" />
              <span>{registrant.locationState}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Calendar className="w-5 h-5 text-gold-400" />
              <span>{new Date(registrant.registeredAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <Users className="w-5 h-5 text-gold-400" />
              <span>
                {registrant.comingWith}
                {registrant.numberOfPersons > 0 && ` (+${registrant.numberOfPersons} persons)`}
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-white/60 mb-2">Expectations</h4>
            <p className="text-white/80 bg-white/5 p-4 rounded-xl">
              {registrant.expectations}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white/5 p-3 rounded-xl">
              <p className="text-white/60">Transportation</p>
              <p className="text-white font-medium">{registrant.meansOfTransportation}</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl">
              <p className="text-white/60">Accommodation</p>
              <p className="text-white font-medium">
                {registrant.needsAccommodation ? 'Yes' : 'No'}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function DeleteConfirmationModal({
  registrant,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  registrant: Registrant;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onCancel}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-card w-full max-w-md overflow-hidden"
      >
        {/* Header with Warning Icon */}
        <div className="p-6 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
            className="w-16 h-16 mx-auto bg-red-500/20 rounded-full flex items-center justify-center mb-4"
          >
            <AlertTriangle className="w-8 h-8 text-red-400" />
          </motion.div>

          <h2 className="text-xl font-display font-bold text-white mb-2">
            Delete Registration?
          </h2>

          <p className="text-white/70 mb-4">
            You are about to delete the registration for:
          </p>

          {/* Registrant Info Card */}
          <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center text-lg font-bold text-primary-900">
                {registrant.fullName.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-white font-semibold">{registrant.fullName}</p>
                <p className="text-white/60 text-sm">{registrant.email}</p>
              </div>
            </div>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3 mb-6">
            <p className="text-red-300 text-sm">
              ⚠️ This action cannot be undone. All registration data for this person will be permanently removed.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 p-4 border-t border-white/10 bg-white/5">
          <Button
            variant="ghost"
            className="flex-1"
            onClick={onCancel}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            className="flex-1 !bg-red-500 hover:!bg-red-600"
            onClick={onConfirm}
            loading={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Yes, Delete'}
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TableSkeleton() {
  return (
    <div className="glass-card p-4 animate-pulse">
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-4">
            <div className="h-12 flex-1 bg-white/10 rounded" />
            <div className="h-12 w-48 bg-white/10 rounded hidden md:block" />
            <div className="h-12 w-32 bg-white/10 rounded hidden lg:block" />
            <div className="h-12 w-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
