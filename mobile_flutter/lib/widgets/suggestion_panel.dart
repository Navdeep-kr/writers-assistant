import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import '../providers/ai_provider.dart';
import '../constants/theme.dart';
import 'glass_card.dart';

class SuggestionPanel extends StatelessWidget {
  final List<dynamic> suggestions;
  const SuggestionPanel({super.key, required this.suggestions});

  @override
  Widget build(BuildContext context) {
    if (suggestions.isEmpty) {
      return const Center(
        child: Text(
          'Your writing is flawless. 💎',
          style: TextStyle(color: AppColors.textMuted, fontSize: 16),
        ),
      );
    }

    return ListView.builder(
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 8),
      itemCount: suggestions.length,
      itemBuilder: (context, index) {
        final s = suggestions[index];
        return Container(
          margin: const EdgeInsets.only(bottom: 12),
          padding: const EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Colors.white.withOpacity(0.02),
            borderRadius: BorderRadius.circular(20),
            border: Border.all(color: Colors.white.withOpacity(0.05)),
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text(
                    s['rule']?['category']?['name']?.toString().toUpperCase() ?? 'GRAMMAR',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 10,
                      fontWeight: FontWeight.w900,
                      color: const Color(0xFF8B5CF6), // Purple from original
                      letterSpacing: 0.5,
                    ),
                  ),
                  Text(
                    'Apply',
                    style: GoogleFonts.plusJakartaSans(
                      fontSize: 12,
                      fontWeight: FontWeight.w700,
                      color: AppColors.primary,
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 8),
              Text(
                s['message'] ?? 'Check this phrasing.',
                style: GoogleFonts.plusJakartaSans(
                  fontSize: 14,
                  color: const Color(0xFFCBD5E1),
                  height: 1.5,
                ),
              ),
            ],
          ),
        );
      },
    );
  }
}
